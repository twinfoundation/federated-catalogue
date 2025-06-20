// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IFederatedCatalogueGetRequest } from "./IFederatedCatalogueGetRequest";

/**
 * Get the a list of the data resource entries.
 */
export interface IDataResourceListRequest extends IFederatedCatalogueGetRequest {
	/**
	 * The query parameters.
	 */
	query?: {
		/**
		 * The Id of the Data Resource.
		 */
		id?: string;

		/**
		 * The service provider.
		 */
		producedBy?: string;

		/**
		 * The optional cursor to get next chunk.
		 */
		cursor?: string;

		/**
		 * The maximum number of entities in a page.
		 */
		pageSize?: number | string;
	};
}
