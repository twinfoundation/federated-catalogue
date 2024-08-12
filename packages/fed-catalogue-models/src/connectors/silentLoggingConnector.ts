// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { EntityCondition, SortDirection } from "@gtsc/entity";
import { nameof } from "@gtsc/nameof";
import type { ILogEntry } from "../models/ILogEntry";
import type { ILoggingConnector } from "../models/ILoggingConnector";

/**
 * Class for performing logging operations to nowhere.
 */
export class SilentLoggingConnector implements ILoggingConnector {
	/**
	 * The namespace for the logging connector.
	 */
	public static readonly NAMESPACE: string = "silent";

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<SilentLoggingConnector>();

	/**
	 * Log an entry to the connector.
	 * @param logEntry The entry to log.
	 * @returns Nothing.
	 */
	public async log(logEntry: ILogEntry): Promise<void> {}

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
	public async query(
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
	}> {
		return {
			entities: [],
			totalEntities: 0
		};
	}
}
