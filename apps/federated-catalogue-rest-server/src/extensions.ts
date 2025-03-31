// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-console */
import type { IEngineServerConfig } from "@twin.org/engine-server-types";
import {
	EntityStorageComponentType,
	LoggingComponentType,
	LoggingConnectorType,
	type IEngineConfig
} from "@twin.org/engine-types";

import {
	type DataResourceEntry,
	type DataSpaceConnectorEntry,
	initSchema,
	type ParticipantEntry,
	type ServiceOfferingEntry
} from "@twin.org/federated-catalogue-service";
import { nameof } from "@twin.org/nameof";

/**
 * Extends the engine config with types specific to workbench.
 * @param engineConfig The engine configuration.
 */
export function extendEngineConfig(engineConfig: IEngineConfig): void {
	initSchema();

	engineConfig.types.entityStorageComponent ??= [];

	engineConfig.types.entityStorageComponent.push({
		type: EntityStorageComponentType.Service,
		options: {
			entityStorageType: nameof<ParticipantEntry>()
		}
	});

	engineConfig.types.entityStorageComponent.push({
		type: EntityStorageComponentType.Service,
		options: {
			entityStorageType: nameof<DataResourceEntry>()
		}
	});

	engineConfig.types.entityStorageComponent.push({
		type: EntityStorageComponentType.Service,
		options: {
			entityStorageType: nameof<ServiceOfferingEntry>()
		}
	});

	engineConfig.types.entityStorageComponent.push({
		type: EntityStorageComponentType.Service,
		options: {
			entityStorageType: nameof<DataSpaceConnectorEntry>()
		}
	});
}

/**
 * Extends server config to customize it.
 * @param serverConfig The server config to be extended
 */
export function extendServerConfig(serverConfig: IEngineServerConfig): void {
	serverConfig.types.loggingConnector ??= [];
	serverConfig.types.loggingConnector.push({ type: LoggingConnectorType.Console, config: {} });

	serverConfig.types.loggingComponent ??= [];
	serverConfig.types.loggingComponent.push({
		type: LoggingComponentType.Service,
		options: { loggingConnectorType: LoggingConnectorType.Console }
	});
}
