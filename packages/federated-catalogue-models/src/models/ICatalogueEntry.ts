// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * A Catalogue entry
 */
export interface ICatalogueEntry {
	/**
	 * The trusted issuer of the compliance credential
	 */
	issuer: string;

	/**
	 * Valid from (as per W3C VC Data Model v2)
	 */
	validFrom: string;

	/**
	 * Valid until (as per W3C VC Data Model v2)
	 */
	validUntil: string;

	/**
	 * The creation date.
	 */
	dateCreated: string;

	/**
	 * The evidences concerning the data resource.
	 */
	evidence: string[];
}
