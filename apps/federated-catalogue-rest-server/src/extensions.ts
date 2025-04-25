// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { EntityStorageComponentType, type IEngineConfig } from "@twin.org/engine-types";

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
