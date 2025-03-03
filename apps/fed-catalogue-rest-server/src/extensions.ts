// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-console */
import type { IEngineCoreTypeConfig } from "@twin.org/engine-models";
import type { IEngineServerConfig } from "@twin.org/engine-server-types";
import {
	EntityStorageComponentType,
	LoggingComponentType,
	LoggingConnectorType,
	type IEngineConfig
} from "@twin.org/engine-types";
import { EntitySchemaFactory, EntitySchemaHelper } from "@twin.org/entity";
import {
	DataResourceEntry,
	DataSpaceConnectorEntry,
	ParticipantEntry,
	ServiceOfferingEntry
} from "@twin.org/federated-catalogue-models";
import { nameof } from "@twin.org/nameof";

/**
 * Extends the engine config with types specific to workbench.
 * @param engineConfig The engine configuration.
 */
export function extendEngineConfig(engineConfig: IEngineConfig): void {
	EntitySchemaFactory.register(nameof<ParticipantEntry>(), () =>
		EntitySchemaHelper.getSchema(ParticipantEntry)
	);

	EntitySchemaFactory.register(nameof<DataResourceEntry>(), () =>
		EntitySchemaHelper.getSchema(DataResourceEntry)
	);

	EntitySchemaFactory.register(nameof<ServiceOfferingEntry>(), () =>
		EntitySchemaHelper.getSchema(ServiceOfferingEntry)
	);

	EntitySchemaFactory.register(nameof<DataSpaceConnectorEntry>(), () =>
		EntitySchemaHelper.getSchema(DataSpaceConnectorEntry)
	);

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
	removeRestRoute(serverConfig.types.restRouteProcessor ?? [], "node-identity");
	removeRestRoute(serverConfig.types.socketRouteProcessor ?? [], "node-identity");

	serverConfig.types.loggingConnector ??= [];
	serverConfig.types.loggingConnector.push({ type: LoggingConnectorType.Console, config: {} });

	serverConfig.types.loggingComponent ??= [];
	serverConfig.types.loggingComponent.push({
		type: LoggingComponentType.Service,
		options: { loggingConnectorType: LoggingConnectorType.Console }
	});
}

/**
 * Removes a REST route from a configuration array.
 * @param restRouteArray The array of REST routes that has to be tweaked
 * @param restRouteName The name of the REST route to be removed
 */
function removeRestRoute(restRouteArray: IEngineCoreTypeConfig[], restRouteName: string): void {
	const position = restRouteArray?.map(rr => rr.type).indexOf(restRouteName) ?? -1;
	restRouteArray.splice(position, 1);
}
