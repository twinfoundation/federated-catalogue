// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { IDataResourceEntry } from "./data-resource/IDataResourceEntry";
import type { IDataSpaceConnectorEntry } from "./data-space-connector/IDataSpaceConnectorEntry";
import type { IParticipantEntry } from "./participant/IParticipantEntry";
import type { IServiceOfferingEntry } from "./service-offering/IServiceOfferingEntry";

/**
 * Interface describing a Federated Catalogue Contract.
 */
export interface IFederatedCatalogue extends IComponent {
	/**
	 * Registers a Participant's compliance Credential to the service.
	 * @param credential The credential as JWT.
	 * @returns The participant Id (usually a DID).
	 */
	registerComplianceCredential(credential: string): Promise<string>;

	/**
	 * Query the federated catalogue.
	 * @param participant The identity of the participant.
	 * @param legalRegistrationNumber The legal registration number.
	 * @param lrnType The legal registration number type (EORI, VATID, GLEIF, Kenya's PIN, etc.)
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	queryParticipants(
		participant?: string,
		legalRegistrationNumber?: string,
		lrnType?: string,
		cursor?: string,
		pageSize?: number
	): Promise<{
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IParticipantEntry[];
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	}>;

	/**
	 * Registers a Data Space Connector to the service.
	 * @param credential The credential as JWT.
	 * @returns The Data Space Connector Id registered.
	 */
	registerDataSpaceConnectorCredential(credential: string): Promise<string>;

	/**
	 * Query the federated catalogue.
	 * @param id Data Space Connector Id.
	 * @param maintainer The identity of the participant maintaining the Data Space Connector.
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	queryDataSpaceConnectors(
		id?: string,
		maintainer?: string,
		cursor?: string,
		pageSize?: number
	): Promise<{
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IDataSpaceConnectorEntry[];
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	}>;

	/**
	 * Registers a service offering Credential to the service.
	 * @param credential The credential as JWT.
	 * @returns The Id of the Service Offerings registered.
	 */
	registerServiceOfferingCredential(credential: string): Promise<string[]>;

	/**
	 * Registers a data resource Credential to the service.
	 * @param credential The credential as JWT.
	 * @returns The Id of the Data Resources registered.
	 */
	registerDataResourceCredential(credential: string): Promise<string[]>;

	/**
	 * Query the federated catalogue.
	 * @param id Service Offering id.
	 * @param providedBy The identity of the participant providing the Offering.
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	queryServiceOfferings(
		id?: string,
		providedBy?: string,
		cursor?: string,
		pageSize?: number
	): Promise<{
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IServiceOfferingEntry[];
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	}>;

	/**
	 * Query the federated catalogue.
	 * @param id The id of the Data Resource.
	 * @param producedBy The identity of the participant producing the data behind the data resource.
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	queryDataResources(
		id?: string,
		producedBy?: string,
		cursor?: string,
		pageSize?: number
	): Promise<{
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IDataResourceEntry[];
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	}>;
}
