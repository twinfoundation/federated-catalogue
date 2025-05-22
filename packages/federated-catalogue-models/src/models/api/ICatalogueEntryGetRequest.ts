// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IFederatedCatalogueGetRequest } from "./IFederatedCatalogueGetRequest";

/**
 * Get a Catalogue Entry.
 */
export interface ICatalogueEntryGetRequest extends IFederatedCatalogueGetRequest {
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
