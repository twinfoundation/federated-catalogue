// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Guards } from "@gtsc/core";
import type {
	IServiceDescriptionCredential,
	IVerificationResult
} from "@gtsc/fed-catalogue-models";
import type { ILoggingConnector } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";

/* eslint-disable jsdoc/require-jsdoc */

export class ServiceDescriptionCredentialVerificationService {
	public CLASS_NAME: string = nameof<ServiceDescriptionCredentialVerificationService>();

	private readonly _logger: ILoggingConnector;

	constructor(logger: ILoggingConnector) {
		this._logger = logger;
	}

	public async verify(credential: IServiceDescriptionCredential): Promise<IVerificationResult> {
		const credentialData = credential.credentialSubject;

		if (!credentialData || credentialData.type !== "gx:ServiceOffering") {
			return {
				verified: false,
				verificationFailureReason: "Invalid subject type"
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

		Guards.stringValue(this.CLASS_NAME, nameof(credentialData["gx:name"]), credentialData["gx:name"]);
		Guards.stringValue(this.CLASS_NAME, nameof(credentialData["gx:providedBy"]), credentialData["gx:providedBy"]);
		Guards.object(this.CLASS_NAME, nameof(credentialData["gx:servicePolicy"]), credentialData["gx:servicePolicy"]);

		return {
			verified: true,
			verificationFailureReason: ""
		};
	}
}
