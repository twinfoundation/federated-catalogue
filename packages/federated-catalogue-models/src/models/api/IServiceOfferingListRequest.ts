// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Get the a list of the service offering entries.
 */
export interface IServiceOfferingListRequest {
	/**
	 * The query parameters.
	 */
	query: {
		/**
		 * The Service Offering Id.
		 */
		id?: string;

		/**
		 * The service provider.
		 */
		providedBy?: string;

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
