// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { CLIDisplay } from "@gtsc/cli-core";
import { ErrorHelper, GeneralError, I18n, Is, type IError } from "@gtsc/core";
import { ConsoleLoggingConnector } from "@gtsc/logging-connector-console";
import {
	EntityStorageLoggingConnector,
	initSchema as initSchemaLogging,
	type LogEntry
} from "@gtsc/logging-connector-entity-storage";
import {
	LoggingConnectorFactory,
	MultiLoggingConnector,
	type ILoggingConnector
} from "@gtsc/logging-models";
import { LoggingService } from "@gtsc/logging-service";
import { nameof } from "@gtsc/nameof";
import { ServiceFactory, type IService } from "@gtsc/services";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { IOptions } from "../models/IOptions.js";

export const LOGGING_SERVICE_NAME = "logging";

let systemLoggingConnector: ILoggingConnector;
let showDetail: boolean;

/**
 * Initialise the logging connector.
 * @param options The options for the web server.
 * @param services The services.
 */
export function initialiseSystemLoggingConnector(options: IOptions, services: IService[]): void {
	// Create a regular console logger which automatically translates messages and hides groups.
	// to display the system messages to the console
	const consoleLoggingConnector = new ConsoleLoggingConnector({
		translateMessages: true,
		hideGroups: true
	});
	services.push(consoleLoggingConnector);

	systemLoggingConnector = consoleLoggingConnector;

	LoggingConnectorFactory.register(
		options.systemLoggingConnectorName,
		() => consoleLoggingConnector
	);

	showDetail = options.debug;
}

/**
 * Initialise the logging service.
 * @param options The options for the web server.
 * @param services The services.
 */
export function initialiseLoggingService(options: IOptions, services: IService[]): void {
	systemLogInfo(I18n.formatMessage("apiServer.configuring", { element: "Logging Service" }));

	const service = new LoggingService();
	services.push(service);
	ServiceFactory.register(LOGGING_SERVICE_NAME, () => service);
}

/**
 * Initialise the logging connector factory.
 * @param options The options for the web server.
 * @param services The services.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseLoggingConnectorFactory(options: IOptions, services: IService[]): void {
	systemLogInfo(
		I18n.formatMessage("apiServer.configuring", { element: "Logging Connector Factory" })
	);

	const types = options.envVars.SERVER_LOGGING_CONNECTOR.split(",");

	for (const type of types) {
		let connector: ILoggingConnector;
		let namespace: string;
		if (type === "console") {
			connector = new ConsoleLoggingConnector({
				translateMessages: true,
				hideGroups: true
			});
			namespace = ConsoleLoggingConnector.NAMESPACE;
		} else if (type === "entity-storage") {
			initSchemaLogging();
			initialiseEntityStorageConnector(
				options,
				services,
				options.envVars.SERVER_LOGGING_ENTITY_STORAGE_TYPE,
				nameof<LogEntry>()
			);
			connector = new EntityStorageLoggingConnector();
			namespace = EntityStorageLoggingConnector.NAMESPACE;
		} else {
			throw new GeneralError("apiServer", "serviceUnknownType", {
				type,
				serviceType: "loggingConnector"
			});
		}

		services.push(connector);
		LoggingConnectorFactory.register(namespace, () => connector);
	}

	// Create a multi logging connector which combines all the logging connectors.
	// and set the factory name to logging which is the default name other connectors
	// will use to get the logging connector.
	const multiConnector = new MultiLoggingConnector({
		loggingConnectorTypes: types
	});
	services.push(multiConnector);
	LoggingConnectorFactory.register("logging", () => multiConnector);
}

/**
 * Log info.
 * @param message The message to log.
 */
export function systemLogInfo(message: string): void {
	systemLoggingConnector?.log({
		source: "apiServer",
		level: "info",
		message
	});
}

/**
 * Log error.
 * @param error The error to log.
 */
export function systemLogError(error: IError): void {
	const formattedErrors = ErrorHelper.localizeErrors(error);
	for (const formattedError of formattedErrors) {
		let message = Is.stringValue(formattedError.source)
			? `${formattedError.source}: ${formattedError.message}`
			: formattedError.message;
		if (showDetail && Is.stringValue(formattedError.stack)) {
			message += `\n${formattedError.stack}`;
		}
		if (systemLoggingConnector) {
			systemLoggingConnector.log({
				source: "apiServer",
				level: "error",
				message
			});
		} else {
			CLIDisplay.error(message);
		}
	}
}
