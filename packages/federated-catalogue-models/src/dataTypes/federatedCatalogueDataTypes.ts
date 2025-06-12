// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DataTypeHandlerFactory, type IJsonSchema } from "@twin.org/data-core";
import { FederatedCatalogueContexts } from "../models/federatedCatalogueContexts";
import { FederatedCatalogueTypes } from "../models/federatedCatalogueTypes";
import DataResourceEntrySchema from "../schemas/DataResourceEntry.json";
import DataResourceListSchema from "../schemas/DataResourceList.json";
import DataSpaceConnectorEntrySchema from "../schemas/DataSpaceConnectorEntry.json";
import DataSpaceConnectorListSchema from "../schemas/DataSpaceConnectorList.json";
import ParticipantEntrySchema from "../schemas/ParticipantEntry.json";
import ParticipantListSchema from "../schemas/ParticipantList.json";
import ServiceOfferingEntrySchema from "../schemas/ServiceOfferingEntry.json";
import ServiceOfferingListSchema from "../schemas/ServiceOfferingList.json";

/**
 * Handle all the data types for federated catalogue.
 */
export class FederatedCatalogueDataTypes {
	/**
	 * Register all the data types.
	 */
	public static registerTypes(): void {
		DataTypeHandlerFactory.register(
			`${FederatedCatalogueContexts.ContextRoot}${FederatedCatalogueTypes.DataResourceEntry}`,
			() => ({
				context: FederatedCatalogueContexts.ContextRoot,
				type: FederatedCatalogueTypes.DataResourceEntry,
				defaultValue: {},
				jsonSchema: async () => DataResourceEntrySchema as IJsonSchema
			})
		);

		DataTypeHandlerFactory.register(
			`${FederatedCatalogueContexts.ContextRoot}${FederatedCatalogueTypes.DataResourceList}`,
			() => ({
				context: FederatedCatalogueContexts.ContextRoot,
				type: FederatedCatalogueTypes.DataResourceList,
				defaultValue: {},
				jsonSchema: async () => DataResourceListSchema as IJsonSchema
			})
		);

		DataTypeHandlerFactory.register(
			`${FederatedCatalogueContexts.ContextRoot}${FederatedCatalogueTypes.DataSpaceConnectorEntry}`,
			() => ({
				context: FederatedCatalogueContexts.ContextRoot,
				type: FederatedCatalogueTypes.DataSpaceConnectorEntry,
				defaultValue: {},
				jsonSchema: async () => DataSpaceConnectorEntrySchema as IJsonSchema
			})
		);

		DataTypeHandlerFactory.register(
			`${FederatedCatalogueContexts.ContextRoot}${FederatedCatalogueTypes.DataSpaceConnectorList}`,
			() => ({
				context: FederatedCatalogueContexts.ContextRoot,
				type: FederatedCatalogueTypes.DataSpaceConnectorList,
				defaultValue: {},
				jsonSchema: async () => DataSpaceConnectorListSchema as IJsonSchema
			})
		);

		DataTypeHandlerFactory.register(
			`${FederatedCatalogueContexts.ContextRoot}${FederatedCatalogueTypes.ParticipantEntry}`,
			() => ({
				context: FederatedCatalogueContexts.ContextRoot,
				type: FederatedCatalogueTypes.ParticipantEntry,
				defaultValue: {},
				jsonSchema: async () => ParticipantEntrySchema as IJsonSchema
			})
		);

		DataTypeHandlerFactory.register(
			`${FederatedCatalogueContexts.ContextRoot}${FederatedCatalogueTypes.ParticipantList}`,
			() => ({
				context: FederatedCatalogueContexts.ContextRoot,
				type: FederatedCatalogueTypes.ParticipantList,
				defaultValue: {},
				jsonSchema: async () => ParticipantListSchema as IJsonSchema
			})
		);

		DataTypeHandlerFactory.register(
			`${FederatedCatalogueContexts.ContextRoot}${FederatedCatalogueTypes.ServiceOfferingEntry}`,
			() => ({
				context: FederatedCatalogueContexts.ContextRoot,
				type: FederatedCatalogueTypes.ServiceOfferingEntry,
				defaultValue: {},
				jsonSchema: async () => ServiceOfferingEntrySchema as IJsonSchema
			})
		);

		DataTypeHandlerFactory.register(
			`${FederatedCatalogueContexts.ContextRoot}${FederatedCatalogueTypes.ServiceOfferingList}`,
			() => ({
				context: FederatedCatalogueContexts.ContextRoot,
				type: FederatedCatalogueTypes.ServiceOfferingList,
				defaultValue: {},
				jsonSchema: async () => ServiceOfferingListSchema as IJsonSchema
			})
		);
	}
}
