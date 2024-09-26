// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import {
	JsonWebSignature2020Verifier,
	type VerifiableCredential
} from "@gaia-x/json-web-signature-2020";
import { Guards, UnprocessableError, type IError } from "@gtsc/core";
import type {
	IComplianceCredential,
	IComplianceEvidence,
	IComplianceVerificationResult,
	IVerifiableCredential,
	IVerificationResult
} from "@gtsc/fed-catalogue-models";
import type { ILoggingConnector } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";
import { FetchHelper } from "@gtsc/web";
import canonicalize from "canonicalize";
import { HashingUtils } from "../utils/hashingUtils";

/* eslint-disable jsdoc/require-jsdoc */

export class ComplianceCredentialVerificationService {
	public CLASS_NAME: string = nameof<ComplianceCredentialVerificationService>();

	private readonly _logger: ILoggingConnector;

	constructor(logger: ILoggingConnector) {
		this._logger = logger;
	}

	public async verify(credential: IComplianceCredential): Promise<IComplianceVerificationResult> {
		if (!Array.isArray(credential.type) || !credential.type.includes("gx:ComplianceCredential")) {
			return {
				verified: false,
				verificationFailureReason: "Invalid credential type",
				credentials: []
			};
		}

		if (credential.issuer !== process.env.CLEARING_HOUSE_WHITELIST) {
			return {
				verified: false,
				verificationFailureReason: `Credential's Issuer is not the clearing house: ${process.env.CLEARING_HOUSE_WHITELIST}`,
				credentials: []
			};
		}

		const validFrom = credential.validFrom;
		const validFromDate = Date.parse(validFrom);
		if (validFromDate > Date.now()) {
			return {
				verified: false,
				verificationFailureReason: "Not valid yet",
				credentials: []
			};
		}

		const validUntil = credential.validUntil;
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

		const evidences = subject["gx:evidence"];
		if (!Array.isArray(evidences) || evidences.length === 0) {
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
			finalResult.credentials.push(verResult.credential as IVerifiableCredential);
		}

		return finalResult;
	}

	private async verifyEvidence(
		evidence: IComplianceEvidence
	): Promise<IVerificationResult & { credential?: IVerifiableCredential }> {
		// The credential associated to the evidence has to be retrieved, then verified
		Guards.object<IComplianceEvidence>(this.CLASS_NAME, nameof<IComplianceEvidence>(), evidence);

		const credentialUrl = evidence.id;
		this._logger.log({
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
			this._logger.log({
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
		const responseData = await credentialResponse.json();
		const theCredential = structuredClone(responseData);

		// The proof is not taken into account to calculate the hash
		delete theCredential.proof;
		// Workaround to reflect the fact that the original enveloped credential contained the "iat" claim
		// and was actually used by the Compliance Service to calculate the hash, probably it shouldn't as it refers
		// to the JWT wrapping the credential, not the credential itself
		if (!theCredential.iat) {
			theCredential.iat = Date.parse(theCredential.validFrom) / 1000;
		}

		// Checking the hash
		const canonicalized = canonicalize(theCredential) as string;
		const hashingDetails = evidence["gx:integrity"];
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

		const verifier: JsonWebSignature2020Verifier = new JsonWebSignature2020Verifier();
		const originalCredential = responseData as VerifiableCredential;
		try {
			await verifier.verify(originalCredential);
		} catch (error) {
			this._logger.log({
				source: this.CLASS_NAME,
				level: "error",
				message: `Credential ${credentialUrl} verification error`,
				ts: Date.now(),
				error: error as IError
			});
			return {
				verified: false,
				verificationFailureReason: `Credential ${credentialUrl} verification error`
			};
		}

		this._logger.log({
			source: this.CLASS_NAME,
			level: "info",
			message: `Credential ${credentialUrl} verified`,
			ts: Date.now()
		});

		return {
			verified: true,
			verificationFailureReason: "",
			credential: originalCredential as IVerifiableCredential
		};
	}
}
