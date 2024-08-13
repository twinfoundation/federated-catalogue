// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { GeneralError, I18n, StringHelper } from "@gtsc/core";
import { FileEntityStorageConnector } from "@gtsc/entity-storage-connector-file";
import { MemoryEntityStorageConnector } from "@gtsc/entity-storage-connector-memory";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@gtsc/entity-storage-models";
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
	systemLogInfo(
		I18n.formatMessage("apiServer.configuringEntityStorage", {
			element: "Entity Storage",
			storageName,
			storageType: type
		})
	);
	let entityStorageConnector: IEntityStorageConnector;

	if (type === "memory") {
		entityStorageConnector = new MemoryEntityStorageConnector({
			entitySchema: schema
		});
	} else if (type === "file") {
		entityStorageConnector = new FileEntityStorageConnector({
			entitySchema: schema,
			config: {
				directory: path.join(options.storageFileRoot, storageName)
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
}
