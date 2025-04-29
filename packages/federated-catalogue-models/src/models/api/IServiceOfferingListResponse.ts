// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IServiceOfferingList } from "../service-offering/IServiceOfferingList";

/**
 * Response for Service Offering list
 */
export interface IServiceOfferingListResponse {
	/**
	 * The response payload.
	 */
	body: {
		/**
		 * The list of service offerings.
		 */
		entities: IServiceOfferingList;

		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	};
}
