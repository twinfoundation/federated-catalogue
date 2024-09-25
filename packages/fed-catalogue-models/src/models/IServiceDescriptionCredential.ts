// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/* eslint-disable jsdoc/require-jsdoc */

export interface IServiceDescriptionCredential {
	"@context": string[];
	type: string;
	id: string;
	issuer: string;
	validFrom: string;
	validUntil: string;
	credentialSubject: {
		id: string;
		type: string;
		"gx:description"?: string;
		"gx:name": string;
		"gx:providedBy": string;
		"gx:servicePolicy": unknown;
		"gx:aggregationOfResources"?: string[];
	};
}
