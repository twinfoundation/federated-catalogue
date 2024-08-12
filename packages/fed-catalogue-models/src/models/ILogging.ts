// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IService } from "@gtsc/services";
import type { ILogEntry } from "./ILogEntry";
import type { LogLevel } from "./logLevel";

/**
 * Interface describing a logging contract.
 */
export interface ILogging extends IService {
	/**
	 * Log an entry to the service.
	 * @param logEntry The entry to log.
	 * @returns Nothing.
	 */
	log(logEntry: ILogEntry): Promise<void>;

	/**
	 * Query the log entries.
	 * @param level The level of the log entries.
	 * @param source The source of the log entries.
	 * @param timeStart The inclusive time as the start of the log entries.
	 * @param timeEnd The inclusive time as the end of the log entries.
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	query(
		level?: LogLevel,
		source?: string,
		timeStart?: number,
		timeEnd?: number,
		cursor?: string,
		pageSize?: number
	): Promise<{
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
	}>;
}
