// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IComplianceCredential, IComplianceEvidence, IVerificationResult } from "@gtsc/fed-catalogue-models";
import { nameof } from "@gtsc/nameof";

/* eslint-disable jsdoc/require-jsdoc */

export class ComplianceCredentialVerificationService {
	public CLASS_NAME: string = nameof<ComplianceCredentialVerificationService>();

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

		for(const evidence of evidences) {
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
		return {
			verified: true,
			verificationFailureReason: ""
		};
	}
}
