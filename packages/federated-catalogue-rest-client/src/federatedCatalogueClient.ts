// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseRestClient } from "@twin.org/api-core";
import type { IBaseRestClientConfig, ICreatedResponse, IHttpRequest } from "@twin.org/api-models";
import { GeneralError, Guards, Is } from "@twin.org/core";
import {
	FederatedCatalogueTypes,
	type FederatedCatalogueEntryType,
	type ICatalogueEntry,
	type ICatalogueEntryGetRequest,
	type IDataResourceEntry,
	type IDataResourceGetResponse,
	type IDataResourceList,
	type IDataResourceListRequest,
	type IDataResourceListResponse,
	type IDataSpaceConnectorEntry,
	type IDataSpaceConnectorGetResponse,
	type IDataSpaceConnectorList,
	type IDataSpaceConnectorListRequest,
	type IDataSpaceConnectorListResponse,
	type IFederatedCatalogueComponent,
	type IParticipantEntry,
	type IParticipantGetResponse,
	type IParticipantList,
	type IParticipantListRequest,
	type IParticipantListResponse,
	type IServiceOfferingEntry,
	type IServiceOfferingGetResponse,
	type IServiceOfferingList,
	type IServiceOfferingListRequest,
	type IServiceOfferingListResponse
} from "@twin.org/federated-catalogue-models";
import { nameof } from "@twin.org/nameof";
import { GaiaXTypes } from "@twin.org/standards-gaia-x";
import { HeaderTypes, MimeTypes } from "@twin.org/web";

/**
 * Client for performing auditable item graph through to REST endpoints.
 */
export class FederatedCatalogueClient
	extends BaseRestClient
	implements IFederatedCatalogueComponent
{
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<FederatedCatalogueClient>();

	/**
	 * Create a new instance of AuditableItemGraphClient.
	 * @param config The configuration for the client.
	 */
	constructor(config: IBaseRestClientConfig) {
		super(nameof<FederatedCatalogueClient>(), config, "federated-catalogue");
	}

	/**
	 * Registers a Participant's compliance Credential to the service.
	 * @param credential The credential as JWT.
	 * @returns The participant Id (usually a DID).
	 */
	public async registerComplianceCredential(credential: string): Promise<string> {
		Guards.stringValue(this.CLASS_NAME, nameof(credential), credential);

		const response = await this.fetch<IHttpRequest<string>, ICreatedResponse>(
			"/participant-credentials",
			"POST",
			{
				body: credential
			}
		);

		return this.getIdsFromLocation(response.headers[HeaderTypes.Location])[0];
	}

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
	public async queryParticipants(
		participant?: string,
		legalRegistrationNumber?: string,
		lrnType?: string,
		cursor?: string,
		pageSize?: number
	): Promise<IParticipantList> {
		const response = await this.fetch<IParticipantListRequest, IParticipantListResponse>(
			"/participants",
			"GET",
			{
				headers: {
					[HeaderTypes.Accept]: MimeTypes.JsonLd
				},
				query: {
					id: participant ? encodeURIComponent(participant) : undefined,
					registrationNumber: legalRegistrationNumber,
					lrnType,
					cursor,
					pageSize
				}
			}
		);

		return response.body;
	}

	/**
	 * Registers a Data Space Connector to the service.
	 * @param credential The credential as JWT.
	 * @returns The Data Space Connector Id registered.
	 */
	public async registerDataSpaceConnectorCredential(credential: string): Promise<string> {
		Guards.stringValue(this.CLASS_NAME, nameof(credential), credential);

		const response = await this.fetch<IHttpRequest<string>, ICreatedResponse>(
			"/data-space-connector-credentials",
			"POST",
			{
				body: credential
			}
		);

		return this.getIdsFromLocation(response.headers[HeaderTypes.Location])[0];
	}

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
	public async queryDataSpaceConnectors(
		id?: string,
		maintainer?: string,
		cursor?: string,
		pageSize?: number
	): Promise<IDataSpaceConnectorList> {
		const response = await this.fetch<
			IDataSpaceConnectorListRequest,
			IDataSpaceConnectorListResponse
		>("/data-space-connectors", "GET", {
			headers: {
				[HeaderTypes.Accept]: MimeTypes.JsonLd
			},
			query: {
				id: id ? encodeURIComponent(id) : undefined,
				maintainedBy: maintainer,
				cursor,
				pageSize
			}
		});

		return response.body;
	}

	/**
	 * Registers a service offering Credential to the service.
	 * @param credential The credential as JWT.
	 * @returns The Id of the Service Offerings registered.
	 */
	public async registerServiceOfferingCredential(credential: string): Promise<string[]> {
		Guards.stringValue(this.CLASS_NAME, nameof(credential), credential);

		const response = await this.fetch<IHttpRequest<string>, ICreatedResponse>(
			"/service-offering-credentials",
			"POST",
			{
				body: credential
			}
		);

		return this.getIdsFromLocation(response.headers[HeaderTypes.Location]);
	}

	/**
	 * Registers a data resource Credential to the service.
	 * @param credential The credential as JWT.
	 * @returns The Id of the Data Resources registered.
	 */
	public async registerDataResourceCredential(credential: string): Promise<string[]> {
		Guards.stringValue(this.CLASS_NAME, nameof(credential), credential);

		const response = await this.fetch<IHttpRequest<string>, ICreatedResponse>(
			"/data-resource-credentials",
			"POST",
			{
				body: credential
			}
		);

		return this.getIdsFromLocation(response.headers[HeaderTypes.Location]);
	}

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
	public async queryServiceOfferings(
		id?: string,
		providedBy?: string,
		cursor?: string,
		pageSize?: number
	): Promise<IServiceOfferingList> {
		const response = await this.fetch<IServiceOfferingListRequest, IServiceOfferingListResponse>(
			"/service-offerings",
			"GET",
			{
				headers: {
					[HeaderTypes.Accept]: MimeTypes.JsonLd
				},
				query: {
					id: id ? encodeURIComponent(id) : undefined,
					providedBy,
					cursor,
					pageSize
				}
			}
		);

		return response.body;
	}

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
	public async queryDataResources(
		id?: string,
		producedBy?: string,
		cursor?: string,
		pageSize?: number
	): Promise<IDataResourceList> {
		const response = await this.fetch<IDataResourceListRequest, IDataResourceListResponse>(
			"/data-resources",
			"GET",
			{
				headers: {
					[HeaderTypes.Accept]: MimeTypes.JsonLd
				},
				query: {
					id: id ? encodeURIComponent(id) : undefined,
					producedBy,
					cursor,
					pageSize
				}
			}
		);

		return response.body;
	}

	/**
	 * Returns a Federated Catalogue entry.
	 * @param entryType The type of entry.
	 * @param entryId The entry's id.
	 * @returns Catalogue Entry
	 * @throws NotFoundError if not found.
	 */
	public async getEntry(
		entryType: FederatedCatalogueEntryType,
		entryId: string
	): Promise<ICatalogueEntry> {
		Guards.stringValue(this.CLASS_NAME, nameof(entryId), entryId);

		switch (entryType) {
			case GaiaXTypes.Participant:
				return this.getParticipantEntry(entryId);
			case GaiaXTypes.DataResource:
				return this.getDataResourceEntry(entryId);
			case GaiaXTypes.ServiceOffering:
				return this.getServiceOfferingEntry(entryId);
			case GaiaXTypes.DataExchangeComponent:
			case FederatedCatalogueTypes.DataSpaceConnector:
				return this.getDataSpaceConnectorEntry(entryId);
			default:
				throw new GeneralError(this.CLASS_NAME, "unknownEntryType", { entryType });
		}
	}

	/**
	 * Gets a Participant entry.
	 * @param entryId The entry Id
	 * @returns The Data Resource entry
	 * @internal
	 */
	private async getParticipantEntry(entryId: string): Promise<IParticipantEntry> {
		const entry = await this.fetch<ICatalogueEntryGetRequest, IParticipantGetResponse>(
			"/participants/:id",
			"GET",
			{
				pathParams: {
					id: entryId
				},
				headers: {
					[HeaderTypes.Accept]: MimeTypes.JsonLd
				}
			}
		);

		return entry.body;
	}

	/**
	 * Gets a Participant entry.
	 * @param entryId The entry Id
	 * @returns The Data Resource entry
	 * @internal
	 */
	private async getDataSpaceConnectorEntry(entryId: string): Promise<IDataSpaceConnectorEntry> {
		const entry = await this.fetch<ICatalogueEntryGetRequest, IDataSpaceConnectorGetResponse>(
			"/data-space-connectors/:id",
			"GET",
			{
				pathParams: {
					id: entryId
				},
				headers: {
					[HeaderTypes.Accept]: MimeTypes.JsonLd
				}
			}
		);

		return entry.body;
	}

	/**
	 * Gets a Data Resource entry.
	 * @param entryId The entry Id
	 * @returns The Data Resource entry
	 * @internal
	 */
	private async getDataResourceEntry(entryId: string): Promise<IDataResourceEntry> {
		const entry = await this.fetch<ICatalogueEntryGetRequest, IDataResourceGetResponse>(
			"/data-resources/:id",
			"GET",
			{
				pathParams: {
					id: entryId
				},
				headers: {
					[HeaderTypes.Accept]: MimeTypes.JsonLd
				}
			}
		);

		return entry.body;
	}

	/**
	 * Gets a Service Offering entry.
	 * @param entryId The entry Id
	 * @returns The Service Offering entry
	 * @internal
	 */
	private async getServiceOfferingEntry(entryId: string): Promise<IServiceOfferingEntry> {
		const entry = await this.fetch<ICatalogueEntryGetRequest, IServiceOfferingGetResponse>(
			"/service-offerings/:id",
			"GET",
			{
				pathParams: {
					id: entryId
				},
				headers: {
					[HeaderTypes.Accept]: MimeTypes.JsonLd
				}
			}
		);

		return entry.body;
	}

	/**
	 * Returns the Id from a location URL.
	 * @param locationURL Location URL
	 * @returns The Id
	 * @throws GeneralError if Id cannot be found
	 * @internal
	 */
	private getIdsFromLocation(locationURL: string): string[] {
		if (Is.undefined(locationURL)) {
			throw new GeneralError(this.CLASS_NAME, "locationURLNotProvided");
		}

		// Localhost is dummy used to build a correct URL as a fallback
		const url = new URL(locationURL, "localhost");
		const searchParams = url.searchParams;
		const ids = searchParams.getAll("id");

		if (Is.empty(ids)) {
			throw new GeneralError(this.CLASS_NAME, "idNotFoundFromLocationURL", { locationURL });
		}

		return ids;
	}
}
