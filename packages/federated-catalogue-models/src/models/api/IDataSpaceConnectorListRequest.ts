// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IFederatedCatalogueGetRequest } from "./IFederatedCatalogueGetRequest";

/**
 * Get the a list of the data space connector entries.
 */
export interface IDataSpaceConnectorListRequest extends IFederatedCatalogueGetRequest {
	/**
	 * The query parameters.
	 */
	query: {
		/**
		 * The id of the Data Space Connector.
		 */
		id?: string;

		/**
		 * The maintainer
		 */
		maintainedBy?: string;

		/**
		 * The optional cursor to get next chunk.
		 */
		cursor?: string;

		/**
		 * The maximum number of entities in a page.
		 */
		pageSize?: number;
	};
}
