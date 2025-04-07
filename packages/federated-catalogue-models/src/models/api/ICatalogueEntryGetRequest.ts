// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Get a Catalogue Entry.
 */
export interface ICatalogueEntryGetRequest {
	/**
	 * The parameters from the path.
	 */
	pathParams: {
		/**
		 * The id of Participant to get.
		 */
		id: string;
	};
}
