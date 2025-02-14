// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IServiceOfferingEntry } from "../service-offering/IServiceOfferingEntry";

/**
 * Response for Service Offering list
 */
export interface IServiceOfferingListResponse {
	/**
	 * The response payload.
	 */
	body: {
		/**
		 * The LD @context.
		 */
		"@context": string[];
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IServiceOfferingEntry[];

		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	};
}
