// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { LogLevel } from "../logLevel";

/**
 * Get the a list of the log entries.
 */
export interface ILoggingListRequest {
	/**
	 * The query parameters.
	 */
	query: {
		/**
		 * The level of the log entries to retrieve.
		 */
		level?: LogLevel;

		/**
		 * The source of the log entries to retrieve.
		 */
		source?: string;

		/**
		 * The start time of the metrics to retrieve as a timestamp in ms.
		 */
		timeStart?: number;

		/**
		 * The end time of the metrics to retrieve as a timestamp in ms.
		 */
		timeEnd?: number;

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
