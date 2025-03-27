// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Guards, UnprocessableError, Is, type IError } from "@twin.org/core";
import {
	FederatedCatalogueTypes,
	type ICredential,
	type IComplianceCredential,
	type IComplianceEvidence,
	type IComplianceVerificationResult,
	type IVerificationResult,
	VerificationFailureReasons
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
				verificationFailureReason: VerificationFailureReasons.InvalidCredentialType,
				credentials: []
			};
		}

		if (!this._clearingHouseWhitelist.includes(credential.issuer as string)) {
			return {
				verified: false,
				verificationFailureReason: VerificationFailureReasons.InvalidIssuer,
				credentials: []
			};
		}

		const validFrom = credential.validFrom;
		if (Is.undefined(validFrom)) {
			return {
				verified: false,
				verificationFailureReason: VerificationFailureReasons.NotValidYet,
				credentials: []
			};
		}
		const validFromDate = Date.parse(validFrom);
		if (validFromDate > Date.now()) {
			return {
				verified: false,
				verificationFailureReason: VerificationFailureReasons.NotValidYet,
				credentials: []
			};
		}

		const validUntil = credential.validUntil;
		if (Is.undefined(validUntil)) {
			return {
				verified: false,
				verificationFailureReason: VerificationFailureReasons.NoValidityEndPeriod,
				credentials: []
			};
		}
		const validUntilDate = Date.parse(validUntil);
		if (validUntilDate <= Date.now()) {
			return {
				verified: false,
				verificationFailureReason: VerificationFailureReasons.Expired,
				credentials: []
			};
		}

		const subject = credential.credentialSubject;
		if (!subject) {
			return {
				verified: false,
				verificationFailureReason: VerificationFailureReasons.MissingSubject,
				credentials: []
			};
		}

		const evidences = Is.array(credential.evidence) ? credential.evidence : [credential.evidence];
		if (evidences.length === 0) {
			return {
				verified: false,
				verificationFailureReason: VerificationFailureReasons.MissingEvidences,
				credentials: []
			};
		}

		const finalResult: IComplianceVerificationResult = {
			verified: true,
			credentials: []
		};

		for (const evidence of evidences) {
			const verResult = await this.verifyEvidence(evidence);
			if (!verResult.verified) {
				return {
					verified: false,
					verificationFailureReason: VerificationFailureReasons.EvidenceCannotBeVerified,
					evidenceVerificationResult: verResult,
					credentials: [],
					evidenceFailedToVerify: [evidence.id]
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
			message: "verifyingEvidenceCredential",
			ts: Date.now(),
			data: {
				credentialUrl
			}
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
				message: "credentialCannotBeRetrieved",
				ts: Date.now(),
				data: {
					credentialUrl,
					statusCode: credentialResponse.status
				}
			});
			return {
				verified: false,
				verificationFailureReason: VerificationFailureReasons.EvidenceCannotBeRetrieved
			};
		}
		const originalCredential = await credentialResponse.json();
		const theCredential = structuredClone(originalCredential);

		const proof = theCredential.proof;
		// The proof is not taken into account to calculate the hash
		delete theCredential.proof;

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
			throw new UnprocessableError(this.CLASS_NAME, "unknownHashingAlgorithm", { hashingAlg });
		}
		if (hashToCheck !== hash) {
			return {
				verified: false,
				verificationFailureReason: VerificationFailureReasons.IntegrityCheckFailed
			};
		}

		const verMethodComponents = proof.verificationMethod.split("#");
		const documentId = theCredential.issuer ?? verMethodComponents[0];
		Guards.stringValue(this.CLASS_NAME, nameof(documentId), documentId);

		let verified: boolean = false;
		try {
			const document = await this._resolver.identityResolve(documentId);
			const jwk = DocumentHelper.getJwk(document, proof.verificationMethod);

			verified = await ProofHelper.verifyProof(theCredential, proof, jwk);
		} catch (error) {
			this._logger?.log({
				source: this.CLASS_NAME,
				level: "error",
				message: "credentialVerificationError",
				ts: Date.now(),
				error: error as IError,
				data: {
					credentialUrl
				}
			});
			return {
				verified,
				verificationFailureReason: VerificationFailureReasons.GeneralVerificationError
			};
		}

		this._logger?.log({
			source: this.CLASS_NAME,
			level: "info",
			message: "credentialEvidenceVerified",
			ts: Date.now(),
			data: {
				credentialUrl
			}
		});

		return {
			verified: true,
			credential: originalCredential as IDidVerifiableCredential
		};
	}
}
