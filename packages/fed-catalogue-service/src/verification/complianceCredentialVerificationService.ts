// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Guards, UnprocessableError, Is, type IError } from "@twin.org/core";
import {
	FederatedCatalogueTypes,
	type ICredential,
	type IComplianceCredential,
	type IComplianceEvidence,
	type IComplianceVerificationResult,
	type IVerificationResult
} from "@twin.org/federated-catalogue-models";
import { DocumentHelper, type IIdentityResolverComponent } from "@twin.org/identity-models";
import type { ILoggingConnector } from "@twin.org/logging-models";
import { nameof } from "@twin.org/nameof";
import { ProofHelper, type IDidVerifiableCredential } from "@twin.org/standards-w3c-did";
import { FetchHelper } from "@twin.org/web";
import canonicalize from "canonicalize";
import { HashingUtils } from "../utils/hashingUtils";

/**
 * Compliance Credential Verification Service.
 */
export class ComplianceCredentialVerificationService {
	public CLASS_NAME: string = nameof<ComplianceCredentialVerificationService>();

	private readonly _resolver: IIdentityResolverComponent;

	private readonly _logger?: ILoggingConnector;

	private readonly _clearingHouseWhitelist: string[];

	/**
	 * Constructor.
	 * @param clearingHouseWhitelist The white list of clearing house identities accepted.
	 * @param resolver The resolver used for DID.
	 * @param logger The Logger Component.
	 */
	constructor(
		clearingHouseWhitelist: string[],
		resolver: IIdentityResolverComponent,
		logger?: ILoggingConnector
	) {
		this._clearingHouseWhitelist = clearingHouseWhitelist;
		this._resolver = resolver;
		this._logger = logger;
	}

	/**
	 * Verifies a Compliance Credential.
	 * @param credential The Credential to be verified
	 * @returns The Verification Result.
	 */
	public async verify(credential: IComplianceCredential): Promise<IComplianceVerificationResult> {
		if (
			!Array.isArray(credential.type) ||
			!credential.type.includes(FederatedCatalogueTypes.ComplianceCredential)
		) {
			return {
				verified: false,
				verificationFailureReason: "Invalid credential type",
				credentials: []
			};
		}

		if (!this._clearingHouseWhitelist.includes(credential.issuer as string)) {
			return {
				verified: false,
				verificationFailureReason: `Credential's Issuer is not the clearing house: ${this._clearingHouseWhitelist}`,
				credentials: []
			};
		}

		const validFrom = credential.validFrom;
		if (Is.undefined(validFrom)) {
			return {
				verified: false,
				verificationFailureReason: "Not valid yet",
				credentials: []
			};
		}
		const validFromDate = Date.parse(validFrom);
		if (validFromDate > Date.now()) {
			return {
				verified: false,
				verificationFailureReason: "Not valid yet",
				credentials: []
			};
		}

		const validUntil = credential.validUntil;
		if (Is.undefined(validUntil)) {
			return {
				verified: false,
				verificationFailureReason: "No validity end period provided",
				credentials: []
			};
		}
		const validUntilDate = Date.parse(validUntil);
		if (validUntilDate <= Date.now()) {
			return {
				verified: false,
				verificationFailureReason: "Expired",
				credentials: []
			};
		}

		const subject = credential.credentialSubject;
		if (!subject) {
			return {
				verified: false,
				verificationFailureReason: "Missing subject",
				credentials: []
			};
		}

		const evidences = Is.array(credential.evidence) ? credential.evidence : [credential.evidence];
		if (evidences.length === 0) {
			return {
				verified: false,
				verificationFailureReason: "Missing evidences",
				credentials: []
			};
		}

		const finalResult: IComplianceVerificationResult = {
			verified: true,
			verificationFailureReason: "",
			credentials: []
		};

		for (const evidence of evidences) {
			const verResult = await this.verifyEvidence(evidence);
			if (!verResult.verified) {
				return {
					verified: false,
					verificationFailureReason: `Evidence failure: ${verResult.verificationFailureReason}`,
					credentials: []
				};
			}
			finalResult.credentials.push(verResult.credential as ICredential);
		}

		return finalResult;
	}

	/**
	 * Verifies the evidence supplied as part of a Compliance Credential.
	 * @param evidence The compliance evidence
	 * @returns The verification result with the original credentials that served as evidence
	 */
	private async verifyEvidence(
		evidence: IComplianceEvidence
	): Promise<IVerificationResult & { credential?: IDidVerifiableCredential }> {
		// The credential associated to the evidence has to be retrieved, then verified
		Guards.object<IComplianceEvidence>(this.CLASS_NAME, nameof<IComplianceEvidence>(), evidence);

		const credentialUrl = evidence.id;
		this._logger?.log({
			source: this.CLASS_NAME,
			level: "info",
			message: `Verifying credential ${credentialUrl}`,
			ts: Date.now()
		});

		const credentialResponse = await FetchHelper.fetch(
			this.CLASS_NAME,
			credentialUrl,
			"GET",
			undefined,
			{ cacheTtlMs: 240000 }
		);
		if (!credentialResponse.ok) {
			this._logger?.log({
				source: this.CLASS_NAME,
				level: "error",
				message: `Credential ${credentialUrl} cannot be retrieved`,
				ts: Date.now(),
				data: {
					statusCode: credentialResponse.status
				}
			});
			return {
				verified: false,
				verificationFailureReason: `Credential ${credentialUrl} cannot be retrieved. HTTP Status Code: ${credentialResponse.status}`
			};
		}
		const originalCredential = await credentialResponse.json();
		const theCredential = structuredClone(originalCredential);

		const proof = theCredential.proof;

		// The proof is not taken into account to calculate the hash
		delete theCredential.proof;

		// Below code no longer needed:

		// Workaround to reflect the fact that the original enveloped credential contained the "iat" claim
		// and was actually used by the Compliance Service to calculate the hash, probably it shouldn't as it refers
		// to the JWT wrapping the credential, not the credential itself
		// if (!theCredential.iat) {
		//	theCredential.iat = Date.parse(theCredential.validFrom) / 1000;
		// }

		// Checking the hash
		const canonicalized = canonicalize(theCredential) as string;
		const hashingDetails = evidence.digestSRI;
		const [hashingAlg, hash] = hashingDetails.split("-");
		let hashToCheck: string | null = "";
		if (hashingAlg === "sha256") {
			hashToCheck = HashingUtils.sha256(canonicalized);
		} else if (hashingAlg === "sha512") {
			hashToCheck = HashingUtils.sha512(canonicalized);
		} else {
			throw new UnprocessableError(this.CLASS_NAME, `Unknown hashing algorithm: ${hashingAlg}`);
		}
		if (hashToCheck !== hash) {
			return {
				verified: false,
				verificationFailureReason: `Credential ${credentialUrl} fingerprint does not match`
			};
		}

		const verMethodComponents = proof.verificationMethod.split("#");
		const documentId = theCredential.issuer ?? verMethodComponents[0];
		Guards.stringValue(this.CLASS_NAME, nameof(documentId), documentId);

		let verified: boolean = false;
		try {
			const document = await this._resolver.identityResolve(documentId);
			const jwk = DocumentHelper.getJwk(document, proof.verificationMethod);

			console.log(originalCredential)

			verified = await ProofHelper.verifyProof(originalCredential, proof, jwk);
		} catch (error) {
			console.log(error)

			this._logger?.log({
				source: this.CLASS_NAME,
				level: "error",
				message: `Credential ${credentialUrl} verification error`,
				ts: Date.now(),
				error: error as IError
			});
			return {
				verified,
				verificationFailureReason: `Credential ${credentialUrl} verification error`
			};
		}

		this._logger?.log({
			source: this.CLASS_NAME,
			level: "info",
			message: `Credential ${credentialUrl} verified`,
			ts: Date.now()
		});

		return {
			verified: true,
			verificationFailureReason: "",
			credential: originalCredential as IDidVerifiableCredential
		};
	}
}
