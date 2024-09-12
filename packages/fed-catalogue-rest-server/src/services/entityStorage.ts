// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { GeneralError, I18n, StringHelper } from "@gtsc/core";
import { EntitySchemaFactory, EntitySchemaHelper } from "@gtsc/entity";
import { FileEntityStorageConnector } from "@gtsc/entity-storage-connector-file";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@gtsc/entity-storage-models";
import { ParticipantEntry, ServiceDescriptionEntry } from "@gtsc/fed-catalogue-models";
import { nameof } from "@gtsc/nameof";
import type { IService } from "@gtsc/services";
import { systemLogInfo } from "./logging.js";
import type { IOptions } from "../models/IOptions.js";

/**
 * Initialise the entity storage connector.
 * @param options The options for the web server.
 * @param services The services.
 * @param type The type of the connector.
 * @param schema The schema for the entity storage.
 * @throws GeneralError if the connector type is unknown.
 */
export function initialiseEntityStorageConnector(
	options: IOptions,
	services: IService[],
	type: string,
	schema: string
): void {
	const storageName = StringHelper.kebabCase(schema);
	const sdStorageName = "service-description-entry";

	EntitySchemaFactory.register(schema, () => EntitySchemaHelper.getSchema(ParticipantEntry));
	EntitySchemaFactory.register(nameof<ServiceDescriptionEntry>(), () =>
		EntitySchemaHelper.getSchema(ServiceDescriptionEntry)
	);

	systemLogInfo(
		I18n.formatMessage("apiServer.configuringEntityStorage", {
			element: "Entity Storage",
			storageName,
			storageType: type
		})
	);
	let entityStorageConnector: IEntityStorageConnector;
	let sdStorageConnector: IEntityStorageConnector;

	if (type === "file") {
		entityStorageConnector = new FileEntityStorageConnector({
			entitySchema: schema,
			config: {
				directory: path.join(options.storageFileRoot, storageName)
			}
		});
		sdStorageConnector = new FileEntityStorageConnector({
			entitySchema: nameof<ServiceDescriptionEntry>(),
			config: {
				directory: path.join(options.storageFileRoot, sdStorageName)
			}
		});
	} else {
		throw new GeneralError("apiServer", "serviceUnknownType", {
			type,
			serviceType: "entityStorage"
		});
	}

	services.push(entityStorageConnector);
	EntityStorageConnectorFactory.register(storageName, () => entityStorageConnector);

	services.push(sdStorageConnector);
	EntityStorageConnectorFactory.register(sdStorageName, () => sdStorageConnector);
}
