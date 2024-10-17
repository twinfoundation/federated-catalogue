// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IService } from "@gtsc/services";
import type { IDataResourceEntry } from "./IDataResourceEntry";
import type { IParticipantEntry } from "./IParticipantEntry";
import type { IServiceDescriptionEntry } from "./IServiceDescriptionEntry";

/**
 * Interface describing a Fed Catalogue Contract.
 */
export interface IFederatedCatalogue extends IService {
	/**
	 * Registers a compliance Credential to the service.
	 * @param credential The credential as JWT.
	 * @returns Nothing.
	 */
	registerComplianceCredential(credential: string): Promise<void>;

	/**
	 * Query the federated catalogue.
	 * @param participant The identity of the participant.
	 * @param legalRegistrationNumber The legal registration number.
	 * @param lrnType The legal registration number type (EORI, VATID, GLEIF, KENYA_PIN, etc.)
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
	 * Registers a service description Credential to the service.
	 * @param credential The credential as JWT.
	 * @returns Nothing.
	 */
	registerServiceDescriptionCredential(credential: string): Promise<void>;

	/**
	 * Query the federated catalogue.
	 * @param id Service id.
	 * @param providedBy The identity of the participant.
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	queryServiceDescriptions(
		id?: string,
		providedBy?: string,
		cursor?: string,
		pageSize?: number
	): Promise<{
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: IServiceDescriptionEntry[];
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	}>;

	/**
	 * Query the federated catalogue.
	 * @param id The identity of the participant.
	 * @param producedBy The identity of the participant.
	 * @param cursor The cursor to request the next page of entities.
	 * @param pageSize The maximum number of entities in a page.
	 * @returns All the entities for the storage matching the conditions,
	 * and a cursor which can be used to request more entities.
	 * @throws NotImplementedError if the implementation does not support retrieval.
	 */
	queryDataResourceDescriptions(
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
