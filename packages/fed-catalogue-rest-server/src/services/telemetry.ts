// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, I18n } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { ServiceFactory, type IService } from "@gtsc/services";
import {
	EntityStorageTelemetryConnector,
	initSchema as initSchemaTelemetry,
	type TelemetryMetric,
	type TelemetryMetricValue
} from "@gtsc/telemetry-connector-entity-storage";
import { TelemetryConnectorFactory, type ITelemetryConnector } from "@gtsc/telemetry-models";
import { TelemetryService } from "@gtsc/telemetry-service";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import { systemLogInfo } from "./logging.js";
import type { IOptions } from "../models/IOptions.js";

export const TELEMETRY_SERVICE_NAME = "telemetry";

/**
 * Initialise the telemetry service.
 * @param options The options for the web server.
 * @param services The services.
 */
export function initialiseTelemetryService(options: IOptions, services: IService[]): void {
	systemLogInfo(I18n.formatMessage("apiServer.configuring", { element: "Telemetry Service" }));

	const service = new TelemetryService({
		telemetryConnectorType: options.envVars.SERVER_TELEMETRY_CONNECTOR
	});
	services.push(service);
	ServiceFactory.register(TELEMETRY_SERVICE_NAME, () => service);
}

/**
 * Initialise the telemetry connector factory.
 * @param options The options for the web server.
 * @param services The services.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseTelemetryConnectorFactory(options: IOptions, services: IService[]): void {
	systemLogInfo(
		I18n.formatMessage("apiServer.configuring", { element: "Telemetry Connector Factory" })
	);

	const type = options.envVars.SERVER_TELEMETRY_CONNECTOR;

	let connector: ITelemetryConnector;
	let namespace: string;
	if (type === "entity-storage") {
		initSchemaTelemetry();
		initialiseEntityStorageConnector(
			options,
			services,
			options.envVars.SERVER_TELEMETRY_ENTITY_STORAGE_TYPE,
			nameof<TelemetryMetric>()
		);
		initialiseEntityStorageConnector(
			options,
			services,
			options.envVars.SERVER_TELEMETRY_ENTITY_STORAGE_TYPE,
			nameof<TelemetryMetricValue>()
		);
		connector = new EntityStorageTelemetryConnector({
			loggingConnectorType: "logging"
		});
		namespace = EntityStorageTelemetryConnector.NAMESPACE;
	} else {
		throw new GeneralError("apiServer", "serviceUnknownType", {
			type,
			serviceType: "telemetryConnector"
		});
	}

	services.push(connector);
	TelemetryConnectorFactory.register(namespace, () => connector);
}
