// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { EntityCondition, SortDirection } from "@gtsc/entity";
import type { IService } from "@gtsc/services";
import type { ILogEntry } from "./ILogEntry";

/**
 * Interface describing a logging connector.
 */
export interface ILoggingConnector extends IService {
	/**
	 * Log an entry to the connector.
	 * @param logEntry The entry to log.
	 * @returns Nothing.
	 */
	log(logEntry: ILogEntry): Promise<void>;

	/**
	 * Query the log entries.
	 * @param conditions The conditions to match for the entities.
	 * @param sortProperties The optional sort order.
	 * @param properties The optional keys to return, defaults to all.
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	query(
		conditions?: EntityCondition<ILogEntry>,
		sortProperties?: {
			property: keyof Omit<ILogEntry, "error" | "data">;
			sortDirection: SortDirection;
		}[],
		properties?: (keyof ILogEntry)[],
		cursor?: string,
		pageSize?: number
	): Promise<{
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: Partial<ILogEntry>[];
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
	}>;
}
