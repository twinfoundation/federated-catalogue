// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ILogEntry } from "../ILogEntry";

/**
 * Response for log entry list request.
 */
export interface ILoggingListResponse {
	/**
	 * The response payload.
	 */
	body: {
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: ILogEntry[];

		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;

		/**
		 * Number of entities to return.
		 */
		pageSize?: number;

		/**
		 * Total entities length.
		 */
		totalEntities: number;
	};
}
