// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IDataResourceEntry } from "../entities/IDataResourceEntry";

/**
 * Response for log entry list request.
 */
export interface IDataResourceListResponse {
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
		entities: IDataResourceEntry[];

		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	};
}
