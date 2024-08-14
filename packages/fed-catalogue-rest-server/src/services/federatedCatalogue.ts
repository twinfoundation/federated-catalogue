// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { I18n, StringHelper } from "@gtsc/core";
import type { ParticipantEntry } from "@gtsc/fed-catalogue-models";
import { FederatedCatalogueService } from "@gtsc/fed-catalogue-service";
import { nameof } from "@gtsc/nameof";
import { ServiceFactory, type IService } from "@gtsc/services";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import { systemLogInfo } from "./logging.js";
import type { IOptions } from "../models/IOptions.js";

export const FED_CATALOGUE_SERVICE_NAME = "fed-catalogue";

/**
 * Initialise the federated catalogue service.
 * @param options The options for the web server.
 * @param services The services.
 */
export function initialiseFederatedCatalogueService(options: IOptions, services: IService[]): void {
	systemLogInfo(I18n.formatMessage("apiServer.configuring", { element: "Catalogue Service" }));

	const schema = nameof<ParticipantEntry>();
	const storageName = StringHelper.kebabCase(schema);

	initialiseEntityStorageConnector(
		options,
		services,
		process.env.FED_CAT_STORAGE_CONNECTOR ?? "file",
		schema
	);

	const service = new FederatedCatalogueService({ entityStorageConnectorName: storageName });

	services.push(service);
	ServiceFactory.register(FED_CATALOGUE_SERVICE_NAME, () => service);
}
