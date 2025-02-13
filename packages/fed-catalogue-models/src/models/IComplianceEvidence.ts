// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IJsonLdNodeObject } from "@twin.org/data-json-ld";

/**
 * Compliance Evidence.
 */
export interface IComplianceEvidence extends IJsonLdNodeObject {
	/**
	 * Id.
	 */
	id: string;

	/**
	 * Type.
	 */
	type: string[];

	/**
	 * Integrity.
	 */
	"gx:integrity": string;

	/**
	 * Integrity normalization
	 *
	 */
	"gx:integrityNormalization": string;

	/**
	 * Engine version
	 *
	 */
	"gx:engineVersion": string;

	/**
	 * Rules version
	 *
	 */
	"gx:rulesVersion": string;

	/**
	 * Original type
	 *
	 */
	"gx:originalType": string | string[];
}
