// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Guards, Is } from "@gtsc/core";
import {
	ComparisonOperator,
	LogicalOperator,
	SortDirection,
	type EntityCondition
} from "@gtsc/entity";
import {
	LoggingConnectorFactory,
	type ILogEntry,
	type ILogging,
	type ILoggingConnector,
	type LogLevel
} from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";

/**
 * Service for performing logging operations to a connector.
 */
export class LoggingService implements ILogging {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<LoggingService>();

	/**
	 * Logging connector used by the service.
	 * @internal
	 */
	private readonly _loggingConnector: ILoggingConnector;

	/**
	 * Create a new instance of LoggingService.
	 * @param options The options for the connector.
	 * @param options.loggingConnectorType The type of the logging connector to use, defaults to "logging".
	 */
	constructor(options?: { loggingConnectorType?: string }) {
		this._loggingConnector = LoggingConnectorFactory.get(
			options?.loggingConnectorType ?? "logging"
		);
	}

	/**
	 * Log an entry to the connector.
	 * @param logEntry The entry to log.
	 * @returns Nothing.
	 */
	public async log(logEntry: ILogEntry): Promise<void> {
		Guards.object<ILogEntry>(this.CLASS_NAME, nameof(logEntry), logEntry);

		await this._loggingConnector.log(logEntry);
	}

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
	public async query(
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
	}> {
		const condition: EntityCondition<Omit<ILogEntry, "error" | "data">> = {
			conditions: [],
			logicalOperator: LogicalOperator.And
		};

		if (Is.stringValue(level)) {
			condition.conditions.push({
				property: "level",
				operator: ComparisonOperator.Equals,
				value: level
			});
		}

		if (Is.stringValue(source)) {
			condition.conditions.push({
				property: "source",
				operator: ComparisonOperator.Equals,
				value: source
			});
		}

		if (Is.number(timeStart)) {
			condition.conditions.push({
				property: "ts",
				operator: ComparisonOperator.GreaterThanOrEqual,
				value: timeStart
			});
		}

		if (Is.number(timeEnd)) {
			condition.conditions.push({
				property: "ts",
				operator: ComparisonOperator.LessThanOrEqual,
				value: timeEnd
			});
		}

		const result = await this._loggingConnector.query(
			condition,
			[
				{
					property: "ts",
					sortDirection: SortDirection.Descending
				}
			],
			undefined,
			cursor,
			pageSize
		);

		return {
			entities: result.entities as ILogEntry[],
			cursor: result.cursor,
			pageSize: result.pageSize,
			totalEntities: result.totalEntities
		};
	}
}
