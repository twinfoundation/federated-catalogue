// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import {
	JsonWebSignature2020Verifier,
	type VerifiableCredential
} from "@gaia-x/json-web-signature-2020";
import { GeneralError, type IError } from "@gtsc/core";
import type {
	IComplianceCredential,
	IComplianceEvidence,
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

	public async verify(credential: IComplianceCredential): Promise<IVerificationResult> {
		if (!Array.isArray(credential.type) || !credential.type.includes("gx:ComplianceCredential")) {
			return {
				verified: false,
				verificationFailureReason: "Invalid type"
			};
		}

		const validFrom = credential.validFrom;
		const validFromDate = Date.parse(validFrom);
		if (validFromDate > Date.now()) {
			return {
				verified: false,
				verificationFailureReason: "Not valid yet"
			};
		}

		const validUntil = credential.validUntil;
		const validUntilDate = Date.parse(validUntil);
		if (validUntilDate <= Date.now()) {
			return {
				verified: false,
				verificationFailureReason: "Expired"
			};
		}

		const subject = credential.credentialSubject;
		if (!subject) {
			return {
				verified: false,
				verificationFailureReason: "Missing subject"
			};
		}

		const evidences = subject["gx:evidence"];
		if (!Array.isArray(evidences)) {
			return {
				verified: false,
				verificationFailureReason: "Missing evidences"
			};
		}

		for (const evidence of evidences) {
			const verResult = await this.verifyEvidence(evidence);
			if (!verResult.verified) {
				return {
					verified: false,
					verificationFailureReason: `Evidence failure: ${verResult.verificationFailureReason}`
				};
			}
		}

		return {
			verified: true,
			verificationFailureReason: ""
		};
	}

	private async verifyEvidence(evidence: IComplianceEvidence): Promise<IVerificationResult> {
		// The credential associated to the evidence has to be retrieved, then verified
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

		delete theCredential.proof;
		theCredential.iat = Date.parse(theCredential.validFrom) / 1000;

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
			throw new GeneralError(this.CLASS_NAME, `Unknown hashing algorithm: ${hashingAlg}`);
		}
		if (hashToCheck !== hash) {
			return {
				verified: false,
				verificationFailureReason: `Credential ${credentialUrl} fingerprint does not match`
			};
		}

		const verifier: JsonWebSignature2020Verifier = new JsonWebSignature2020Verifier();
		try {
			await verifier.verify(responseData as VerifiableCredential);
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
			verificationFailureReason: ""
		};
	}
}
