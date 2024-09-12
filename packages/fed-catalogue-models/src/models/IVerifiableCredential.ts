// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/* eslint-disable jsdoc/require-jsdoc */

export interface IVerifiableCredential {
	"@context": string | string[];
	type: string | string[];
	proof: unknown;
	credentialSubject: { [property: "type" | string]: unknown };
	evidence: {
		"gx:evidenceOf": string;
		"gx:evidenceURL": string;
		"gx:executionDate": string;
	};
}
