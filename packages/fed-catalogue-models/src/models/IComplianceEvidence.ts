// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/* eslint-disable jsdoc/require-jsdoc */

export interface IComplianceEvidence {
	id: string;
	type: string;
	"gx:integrity": string;
	"gx:integrityNormalization": string;
	"gx:engineVersion": string;
	"gx:rulesVersion": string;
	"gx:originalType": string | string[];
}
