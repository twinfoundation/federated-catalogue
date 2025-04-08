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
		 * The ID of the entry (Participant, Service, etc.) to get.
		 */
		id: string;
	};
}
