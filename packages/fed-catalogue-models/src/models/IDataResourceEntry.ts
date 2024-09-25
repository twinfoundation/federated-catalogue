// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/* eslint-disable jsdoc/require-jsdoc */

/**
 * Interface describing a participant.
 */
export interface IDataResourceEntry {
	/**
	 * The participant Id.
	 */
	id: string;

	/**
	 * JSON-LD type.
	 */
	type: "DataResource";

	name: string;

	description?: string;

	producedBy: string;

	copyrightOwnedBy: string;

	license: string;

	exposedThrough: string;

	resourcePolicy: unknown;

	validFrom: string;

	validUntil: string;

	dateCreated: string;

	evidences: string[];
}
