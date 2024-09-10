// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IComplianceEvidence } from "./IComplianceEvidence";

/* eslint-disable jsdoc/require-jsdoc */

export interface IComplianceCredential {
	"@context": string[];
	type: string[];
	id: string;
	issuer: string;
	validFrom: string;
	validUntil: string;
	credentialSubject: {
		id: string;
		"gx:evidence": IComplianceEvidence[];
	};
}
