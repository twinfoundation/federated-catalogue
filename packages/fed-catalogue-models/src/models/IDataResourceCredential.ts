// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/* eslint-disable jsdoc/require-jsdoc */

export interface IDataResourceCredential {
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
		"gx:exposedThrough": string;
		"gx:producedBy": string;
		"gx:license": string;
		"gx:copyrightOwnedBy": string;
		"gx:resourcePolicy": unknown;
	};
}
