// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	ICreatedResponse,
	IHttpRequestContext,
	INotFoundResponse,
	IRestRoute,
	ITag,
	IUnprocessableEntityResponse
} from "@twin.org/api-models";
import { Coerce, ComponentFactory, Guards } from "@twin.org/core";
import {
	type ICatalogueEntryGetRequest,
	type ICompliancePresentationRequest,
	type IDataResourceEntry,
	type IDataResourceGetResponse,
	type IDataResourceListRequest,
	type IDataResourceListResponse,
	type IDataSpaceConnectorEntry,
	type IDataSpaceConnectorGetResponse,
	type IDataSpaceConnectorListRequest,
	type IDataSpaceConnectorListResponse,
	type IFederatedCatalogueComponent,
	type IParticipantEntry,
	type IParticipantGetResponse,
	type IParticipantListRequest,
	type IParticipantListResponse,
	type IServiceOfferingEntry,
	type IServiceOfferingGetResponse,
	type IServiceOfferingListRequest,
	type IServiceOfferingListResponse,
	FederatedCatalogueContextInstances,
	FederatedCatalogueTypes
} from "@twin.org/federated-catalogue-models";
import { nameof } from "@twin.org/nameof";
import { GaiaXTypes } from "@twin.org/standards-gaia-x";
import { SchemaOrgTypes } from "@twin.org/standards-schema-org";
import type { IOdrlPolicy } from "@twin.org/standards-w3c-odrl";
import { HttpStatusCode, MimeTypes } from "@twin.org/web";

/**
 * The source used when communicating about these routes.
 */
const ROUTES_SOURCE = "federatedCatalogueRoutes";

/**
 * Participants route.
 */
const PARTICIPANTS_ROUTE = "participants";

/**
 * Service offering route.
 */
const SERVICE_OFFERING_ROUTE = "service-offerings";

/**
 * Data Resource route.
 */
const DATA_RESOURCE_ROUTE = "data-resources";

/**
 * Data Space Connector route.
 */
const DATA_SPACE_CONNECTOR_ROUTE = "data-space-connectors";

/**
 * The tag to associate with the routes.
 */
export const tagsFederatedCatalogue: ITag[] = [
	{
		name: "Federated Catalogue",
		description: "Endpoints to access a Federated Catalogue."
	}
];

/**
 * The REST routes for Federated Catalogue.
 * @param baseRouteName Prefix to prepend to the paths.
 * @param factoryServiceName The name of the service to use in the routes store in the ServiceFactory.
 * @returns The generated routes.
 */
export function generateRestRoutesFederatedCatalogue(
	baseRouteName: string,
	factoryServiceName: string
): IRestRoute[] {
	const createParticipantRoute: IRestRoute<ICompliancePresentationRequest, ICreatedResponse> = {
		operationId: "compliancePresentationRequest",
		summary: "Present a Compliance Credential",
		tag: tagsFederatedCatalogue[0].name,
		method: "POST",
		path: `${baseRouteName}/participant-credentials`,
		handler: async (httpRequestContext, request) =>
			complianceCredentialPresentation(
				baseRouteName,
				httpRequestContext,
				factoryServiceName,
				request
			),
		requestType: {
			mimeType: MimeTypes.Jwt,
			type: nameof<ICompliancePresentationRequest>(),
			examples: [
				{
					id: "compliancePresentationRequestExample",
					request: {
						body: "ey..."
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<ICreatedResponse>()
			},
			{ type: nameof<IUnprocessableEntityResponse>() }
		]
	};

	const createServiceOfferingRoute: IRestRoute<ICompliancePresentationRequest, ICreatedResponse> = {
		operationId: "serviceOfferingPresentationRequest",
		summary: "Present a Service Offering Credential",
		tag: tagsFederatedCatalogue[0].name,
		method: "POST",
		path: `${baseRouteName}/service-offering-credentials`,
		handler: async (httpRequestContext, request) =>
			serviceOfferingCredentialPresentation(
				baseRouteName,
				httpRequestContext,
				factoryServiceName,
				request
			),
		requestType: {
			mimeType: MimeTypes.Jwt,
			type: nameof<ICompliancePresentationRequest>(),
			examples: [
				{
					id: "serviceOfferingPresentationRequestExample",
					request: {
						body: "ey..."
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<ICreatedResponse>()
			},
			{ type: nameof<IUnprocessableEntityResponse>() }
		]
	};

	const createDataSpaceConnectorRoute: IRestRoute<
		ICompliancePresentationRequest,
		ICreatedResponse
	> = {
		operationId: "dataSpaceConnectorPresentationRequest",
		summary: "Present a Data Space Connector Credential",
		tag: tagsFederatedCatalogue[0].name,
		method: "POST",
		path: `${baseRouteName}/data-space-connector-credentials`,
		handler: async (httpRequestContext, request) =>
			dataSpaceConnectorCredentialPresentation(
				baseRouteName,
				httpRequestContext,
				factoryServiceName,
				request
			),
		requestType: {
			mimeType: MimeTypes.Jwt,
			type: nameof<ICompliancePresentationRequest>(),
			examples: [
				{
					id: "dataSpaceConnectorPresentationRequestExample",
					request: {
						body: "ey..."
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<ICreatedResponse>()
			},
			{ type: nameof<IUnprocessableEntityResponse>() }
		]
	};

	const createDataResourceRoute: IRestRoute<ICompliancePresentationRequest, ICreatedResponse> = {
		operationId: "dataResourcePresentationRequest",
		summary: "Present a Data Resource Credential",
		tag: tagsFederatedCatalogue[0].name,
		method: "POST",
		path: `${baseRouteName}/data-resource-credentials`,
		handler: async (httpRequestContext, request) =>
			dataResourceCredentialPresentation(
				baseRouteName,
				httpRequestContext,
				factoryServiceName,
				request
			),
		requestType: {
			mimeType: MimeTypes.Jwt,
			type: nameof<ICompliancePresentationRequest>(),
			examples: [
				{
					id: "dataResourcePresentationRequestExample",
					request: {
						body: "ey..."
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<ICreatedResponse>()
			},
			{ type: nameof<IUnprocessableEntityResponse>() }
		]
	};

	const participantEntryExample: IParticipantEntry = {
		"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY,
		id: "did:iota:xxx",
		type: GaiaXTypes.Participant,
		registrationNumber: {
			type: GaiaXTypes.LocalRegistrationNumber,
			local: "P1234567"
		},
		legalName: "A Inc.",
		issuer: "did:iota:zzz",
		legalAddress: {
			type: GaiaXTypes.Address,
			countryCode: "KE"
		},
		validFrom: "2024-08-01T12:00:00Z",
		validUntil: "2025-08-01T12:00:00Z",
		dateCreated: "2024-08-02T13:45:00Z",
		evidence: ["https://credentials.example.org/1234567"]
	};

	const listParticipantsRoute: IRestRoute<IParticipantListRequest, IParticipantListResponse> = {
		operationId: "federatedCatalogueListParticipants",
		summary: "Get a list of the participant entries",
		tag: tagsFederatedCatalogue[0].name,
		method: "GET",
		path: `${baseRouteName}/${PARTICIPANTS_ROUTE}`,
		handler: async (httpRequestContext, request) =>
			participantList(httpRequestContext, factoryServiceName, request),
		requestType: {
			type: nameof<IParticipantListRequest>(),
			examples: [
				{
					id: "participantListRequestExample",
					request: {
						query: {
							registrationNumber: "abc"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<IParticipantListResponse>(),
				examples: [
					{
						id: "participantListResponseExample",
						response: {
							body: {
								"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY_LIST,
								type: SchemaOrgTypes.ItemList,
								itemListElement: [
									{
										...participantEntryExample
									}
								]
							}
						}
					}
				]
			}
		]
	};

	const getParticipantRoute: IRestRoute<
		ICatalogueEntryGetRequest,
		IParticipantGetResponse | INotFoundResponse
	> = {
		operationId: "federatedCatalogueGetParticipant",
		summary: "Get a participant",
		tag: tagsFederatedCatalogue[0].name,
		method: "GET",
		path: `${baseRouteName}/${PARTICIPANTS_ROUTE}/:id`,
		handler: async (httpRequestContext, request) =>
			participantGet(httpRequestContext, factoryServiceName, request),
		requestType: {
			type: nameof<ICatalogueEntryGetRequest>(),
			examples: [
				{
					id: "participantGetRequestExample",
					request: {
						pathParams: {
							id: "did:iota:123456"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<IParticipantGetResponse>(),
				examples: [
					{
						id: "participantGetResponseExample",
						response: {
							body: { ...participantEntryExample }
						}
					}
				]
			}
		]
	};

	const servicePolicyExample: IOdrlPolicy = {
		"@context": [
			"https://www.w3.org/ns/odrl/2/",
			{
				twin: "https://schema.twindev.org/odrl/",
				jsonPathSelector: "twin:jsonPathSelector"
			}
		],
		"@type": "Agreement",
		uid: "http://example.com/policy:1010",
		assigner: "did:iota:testnet:0x1a7bded4d22dc54722435d624e4323e10fcbc570cd57462eabbf3a5ab2ced24f",
		assignee: "did:iota:testnet:0x119adb64d01d3b0fa0d308c67db90ab1c6e0df6aebe5b7e0250783f57cd10c21",
		permission: [
			{
				target: {
					type: "https://vocabulary.uncefact.org/Document",
					refinement: {
						leftOperand: {
							"@id": "https://w3id.org/twin/odrl/propertyValue",
							jsonPathSelector: ".documentTypeCode"
						},
						operator: "eq",
						rightOperand: "https://vocabulary.uncefact.org/DocumentCodeList#331"
					}
				},
				action: "extract"
			}
		]
	};

	const serviceOfferingEntryExample: IServiceOfferingEntry = {
		"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY,
		id: "http://example.org/is123456",
		name: "Service 1",
		type: GaiaXTypes.ServiceOffering,
		servicePolicy: [servicePolicyExample],
		endpoint: {
			type: GaiaXTypes.Endpoint,
			endpointURL: "https://endpoint.example.org/api"
		},
		issuer: "did:iota:7890",
		providedBy: "did:iota:1234567",
		validFrom: "2024-08-01T12:00:00Z",
		validUntil: "2025-08-01T12:00:00Z",
		dateCreated: "2024-08-02T13:45:00Z",
		evidence: ["https://credentials.example.org/1234567"]
	};

	const listServicesRoute: IRestRoute<IServiceOfferingListRequest, IServiceOfferingListResponse> = {
		operationId: "federatedCatalogueListServices",
		summary: "Get a list of the service entries",
		tag: tagsFederatedCatalogue[0].name,
		method: "GET",
		path: `${baseRouteName}/${SERVICE_OFFERING_ROUTE}`,
		handler: async (httpRequestContext, request) =>
			serviceOfferingList(httpRequestContext, factoryServiceName, request),
		requestType: {
			type: nameof<IServiceOfferingListRequest>(),
			examples: [
				{
					id: "serviceOfferingListRequestExample",
					request: {
						query: {
							providedBy: "did:iota:1234"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<IServiceOfferingListResponse>(),
				examples: [
					{
						id: "serviceOfferingListResponseExample",
						response: {
							body: {
								"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY_LIST,
								type: SchemaOrgTypes.ItemList,
								itemListElement: [
									{
										...serviceOfferingEntryExample
									}
								]
							}
						}
					}
				]
			}
		]
	};

	const getServiceRoute: IRestRoute<
		ICatalogueEntryGetRequest,
		IServiceOfferingGetResponse | INotFoundResponse
	> = {
		operationId: "federatedCatalogueGetService",
		summary: "Get a Service Offering entry",
		tag: tagsFederatedCatalogue[0].name,
		method: "GET",
		path: `${baseRouteName}/${SERVICE_OFFERING_ROUTE}/:id`,
		handler: async (httpRequestContext, request) =>
			serviceOfferingGet(httpRequestContext, factoryServiceName, request),
		requestType: {
			type: nameof<ICatalogueEntryGetRequest>(),
			examples: [
				{
					id: "serviceOfferingGetRequestExample",
					request: {
						pathParams: {
							id: "https://my-services.example.org/service1"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<IServiceOfferingGetResponse>(),
				examples: [
					{
						id: "serviceOfferingGetResponseExample",
						response: {
							body: {
								...serviceOfferingEntryExample
							}
						}
					}
				]
			}
		]
	};

	const resourcePolicyExample: IOdrlPolicy = {
		"@context": ["https://www.w3.org/ns/odrl/2/"],
		"@type": "Offer",
		uid: "http://example.com/policy:1010",
		assigner: "did:iota:testnet:0x1a7bded4d22dc54722435d624e4323e10fcbc570cd57462eabbf3a5ab2ced24f",
		permission: [
			{
				target: {
					type: "https://vocabulary.uncefact.org/Document"
				},
				action: "extract"
			}
		]
	};

	const dataResourceEntryExample: IDataResourceEntry = {
		"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY,
		id: "http://example.org/is123456",
		name: "Data Resource 1",
		type: "DataResource",
		copyrightOwnedBy: "did:iota:1234",
		license: "http://licenses.example.org/12345",
		resourcePolicy: [resourcePolicyExample],
		exposedThrough: "https://ds-connectors.example.org/ds1",
		producedBy: "did:iota:1234567",
		issuer: "did:iota:987654",
		validFrom: "2024-08-01T12:00:00Z",
		validUntil: "2025-08-01T12:00:00Z",
		dateCreated: "2024-08-02T13:45:00Z",
		evidence: ["https://credentials.example.org/1234567"]
	};

	const listDataResourcesRoute: IRestRoute<IDataResourceListRequest, IDataResourceListResponse> = {
		operationId: "federatedCatalogueListResources",
		summary: "Get a list of the data resource entries",
		tag: tagsFederatedCatalogue[0].name,
		method: "GET",
		path: `${baseRouteName}/${DATA_RESOURCE_ROUTE}`,
		handler: async (httpRequestContext, request) =>
			dataResourceList(httpRequestContext, factoryServiceName, request),
		requestType: {
			type: nameof<IDataResourceListRequest>(),
			examples: [
				{
					id: "dataResourceListRequestExample",
					request: {
						query: {
							producedBy: "did:iota:1234"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<IDataResourceListResponse>(),
				examples: [
					{
						id: "dataResourceListResponseExample",
						response: {
							body: {
								"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY_LIST,
								type: SchemaOrgTypes.ItemList,
								itemListElement: [
									{
										...dataResourceEntryExample
									}
								]
							}
						}
					}
				]
			}
		]
	};

	const getDataResourceRoute: IRestRoute<
		ICatalogueEntryGetRequest,
		IDataResourceGetResponse | INotFoundResponse
	> = {
		operationId: "federatedCatalogueGetDataResource",
		summary: "Get a Data Resource entry",
		tag: tagsFederatedCatalogue[0].name,
		method: "GET",
		path: `${baseRouteName}/${DATA_RESOURCE_ROUTE}/:id`,
		handler: async (httpRequestContext, request) =>
			dataResourceGet(httpRequestContext, factoryServiceName, request),
		requestType: {
			type: nameof<IDataResourceListRequest>(),
			examples: [
				{
					id: "dataResourceListRequestExample",
					request: {
						pathParams: {
							id: "https://data-resources.example.org/drs1"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<IDataResourceGetResponse>(),
				examples: [
					{
						id: "dataResourceGetResponseExample",
						response: {
							body: {
								...dataResourceEntryExample
							}
						}
					}
				]
			}
		]
	};

	const dataSpaceConnectorEntryExample: IDataSpaceConnectorEntry = {
		"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY,
		id: "https://my-ds-connectors.example.org/ds-connector-ABCD",
		type: [GaiaXTypes.DataExchangeComponent, FederatedCatalogueTypes.DataSpaceConnector],
		identity: "did:iota:testnet:123456",
		defaultEndpoint: {
			type: GaiaXTypes.Endpoint,
			endpointURL: "https://my-twin-node.example.org:9000/twin-ds-connector"
		},
		subscriptionActivityEndpoint: {
			type: GaiaXTypes.Endpoint,
			endpointURL: "/subscriptions"
		},
		pushActivityEndpoint: {
			type: GaiaXTypes.Endpoint,
			endpointURL: "/notify"
		},
		pullDataEndpoint: {
			type: GaiaXTypes.Endpoint,
			endpointURL: "/data"
		},
		maintainer: "did:iota:99999",
		offeredResource: ["https://my-data-resource.example.org"],
		issuer: "did:iota:987654",
		validFrom: "2024-08-01T12:00:00Z",
		validUntil: "2025-08-01T12:00:00Z",
		dateCreated: "2024-08-02T13:45:00Z",
		evidence: ["https://credentials.example.org/1234567"]
	};

	const listDataSpaceConnectorsRoute: IRestRoute<
		IDataSpaceConnectorListRequest,
		IDataSpaceConnectorListResponse
	> = {
		operationId: "federatedCatalogueListDataSpaceConnectors",
		summary: "Get a list of the Data Space connectors entries",
		tag: tagsFederatedCatalogue[0].name,
		method: "GET",
		path: `${baseRouteName}/${DATA_SPACE_CONNECTOR_ROUTE}`,
		handler: async (httpRequestContext, request) =>
			dataSpaceConnectorList(httpRequestContext, factoryServiceName, request),
		requestType: {
			type: nameof<IDataSpaceConnectorListRequest>(),
			examples: [
				{
					id: "dataSpaceConnectorListRequestExample",
					request: {
						query: {
							maintainedBy: "did:iota:1234"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<IDataSpaceConnectorListResponse>(),
				examples: [
					{
						id: "dataSpaceConnectorListResponseExample",
						response: {
							body: {
								"@context": FederatedCatalogueContextInstances.DEFAULT_LD_CONTEXT_ENTRY_LIST,
								type: SchemaOrgTypes.ItemList,
								itemListElement: [
									{
										...dataSpaceConnectorEntryExample
									}
								]
							}
						}
					}
				]
			}
		]
	};

	const getDataSpaceConnectorRoute: IRestRoute<
		ICatalogueEntryGetRequest,
		IDataSpaceConnectorGetResponse | INotFoundResponse
	> = {
		operationId: "federatedCatalogueGetDataSpaceConnector",
		summary: "Get a Data Space Connector entry",
		tag: tagsFederatedCatalogue[0].name,
		method: "GET",
		path: `${baseRouteName}/${DATA_SPACE_CONNECTOR_ROUTE}/:id`,
		handler: async (httpRequestContext, request) =>
			dataSpaceConnectorGet(httpRequestContext, factoryServiceName, request),
		requestType: {
			type: nameof<ICatalogueEntryGetRequest>(),
			examples: [
				{
					id: "dataSpaceConnectorGetRequestExample",
					request: {
						pathParams: {
							id: "https://ds-connectors.example.org/ds1"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<IDataSpaceConnectorGetResponse>(),
				examples: [
					{
						id: "dataSpaceConnectorGetResponseExample",
						response: {
							body: {
								...dataSpaceConnectorEntryExample
							}
						}
					}
				]
			}
		]
	};

	return [
		createParticipantRoute,
		createServiceOfferingRoute,
		createDataResourceRoute,
		createDataSpaceConnectorRoute,
		listParticipantsRoute,
		getParticipantRoute,
		listServicesRoute,
		getServiceRoute,
		listDataResourcesRoute,
		getDataResourceRoute,
		listDataSpaceConnectorsRoute,
		getDataSpaceConnectorRoute
	];
}

/**
 * Register a new participant.
 * @param baseRouteName The base route name.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function complianceCredentialPresentation(
	baseRouteName: string,
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ICompliancePresentationRequest
): Promise<ICreatedResponse> {
	Guards.object<ICompliancePresentationRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.body), request.body);

	const service = ComponentFactory.get<IFederatedCatalogueComponent>(factoryServiceName);
	const participantId = await service.registerComplianceCredential(request.body);

	const searchParams = new URLSearchParams();
	searchParams.append("id", participantId);
	return {
		headers: {
			location: `${baseRouteName}/${PARTICIPANTS_ROUTE}?${searchParams.toString()}`
		},
		statusCode: HttpStatusCode.created
	};
}

/**
 * Get a list of the participant entries.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function participantList(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: IParticipantListRequest
): Promise<IParticipantListResponse> {
	const service = ComponentFactory.get<IFederatedCatalogueComponent>(factoryServiceName);

	const itemsAndCursor = await service.queryParticipants(
		request?.query?.id,
		request?.query?.registrationNumber,
		request?.query?.lrnType,
		request?.query?.cursor,
		Coerce.number(request?.query?.pageSize)
	);
	return {
		body: {
			...itemsAndCursor
		}
	};
}

/**
 * Get a Participant entry.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function participantGet(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ICatalogueEntryGetRequest
): Promise<IParticipantGetResponse | INotFoundResponse> {
	const service = ComponentFactory.get<IFederatedCatalogueComponent>(factoryServiceName);

	const id = request?.pathParams.id;
	Guards.stringValue(ROUTES_SOURCE, nameof(id), id);

	return {
		body: (await service.getEntry(GaiaXTypes.Participant, id)) as IParticipantEntry
	};
}

/**
 * Register a new service offering.
 * @param baseRouteName The base route used.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function serviceOfferingCredentialPresentation(
	baseRouteName: string,
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ICompliancePresentationRequest
): Promise<ICreatedResponse> {
	Guards.object<ICompliancePresentationRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.body), request.body);

	const service = ComponentFactory.get<IFederatedCatalogueComponent>(factoryServiceName);
	const serviceOfferingsCreated = await service.registerServiceOfferingCredential(request.body);

	// Prepare the Ids to be returned
	const searchParams = new URLSearchParams();
	for (const serviceOffering of serviceOfferingsCreated) {
		searchParams.append("id", serviceOffering);
	}
	return {
		headers: {
			location: `${baseRouteName}/${SERVICE_OFFERING_ROUTE}?${searchParams.toString()}`
		},
		statusCode: HttpStatusCode.created
	};
}

/**
 * Get a list of the service offering entries.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function serviceOfferingList(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: IServiceOfferingListRequest
): Promise<IServiceOfferingListResponse> {
	const service = ComponentFactory.get<IFederatedCatalogueComponent>(factoryServiceName);

	const itemsAndCursor = await service.queryServiceOfferings(
		request?.query.id,
		request?.query.providedBy,
		request?.query.cursor,
		Coerce.number(request?.query?.pageSize)
	);
	return {
		body: {
			...itemsAndCursor
		}
	};
}

/**
 * Get a Service Offering entry.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function serviceOfferingGet(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ICatalogueEntryGetRequest
): Promise<IServiceOfferingGetResponse | INotFoundResponse> {
	const service = ComponentFactory.get<IFederatedCatalogueComponent>(factoryServiceName);

	const id = request?.pathParams.id;
	Guards.stringValue(ROUTES_SOURCE, nameof(id), id);

	return {
		body: (await service.getEntry(GaiaXTypes.ServiceOffering, id)) as IServiceOfferingEntry
	};
}

/**
 * Register a new data resource.
 * @param baseRouteName The base route name.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function dataResourceCredentialPresentation(
	baseRouteName: string,
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ICompliancePresentationRequest
): Promise<ICreatedResponse> {
	Guards.object<ICompliancePresentationRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.body), request.body);

	const service = ComponentFactory.get<IFederatedCatalogueComponent>(factoryServiceName);
	const dataResourcesCreated = await service.registerDataResourceCredential(request.body);

	// Prepare the Ids to be returned
	const searchParams = new URLSearchParams();
	for (const dataResource of dataResourcesCreated) {
		searchParams.append("id", dataResource);
	}
	return {
		headers: {
			location: `${baseRouteName}/${DATA_RESOURCE_ROUTE}?${searchParams.toString()}`
		},
		statusCode: HttpStatusCode.created
	};
}

/**
 * Get a list of the data resource entries.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function dataResourceList(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: IDataResourceListRequest
): Promise<IDataResourceListResponse> {
	const service = ComponentFactory.get<IFederatedCatalogueComponent>(factoryServiceName);

	const itemsAndCursor = await service.queryDataResources(
		request?.query.id,
		request?.query.producedBy,
		request?.query.cursor,
		Coerce.number(request?.query?.pageSize)
	);
	return {
		body: {
			...itemsAndCursor
		}
	};
}

/**
 * Get a Data Resource entry.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function dataResourceGet(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ICatalogueEntryGetRequest
): Promise<IDataResourceGetResponse | INotFoundResponse> {
	const service = ComponentFactory.get<IFederatedCatalogueComponent>(factoryServiceName);

	const id = request?.pathParams.id;
	Guards.stringValue(ROUTES_SOURCE, nameof(id), id);

	return {
		body: (await service.getEntry(GaiaXTypes.DataResource, id)) as IDataResourceEntry
	};
}

/**
 * Register a new data space connector.
 * @param baseRouteName the base route name.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function dataSpaceConnectorCredentialPresentation(
	baseRouteName: string,
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ICompliancePresentationRequest
): Promise<ICreatedResponse> {
	Guards.object<ICompliancePresentationRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.body), request.body);

	const service = ComponentFactory.get<IFederatedCatalogueComponent>(factoryServiceName);
	const dataSpaceConnectorId = await service.registerDataSpaceConnectorCredential(request.body);

	const searchParams = new URLSearchParams();
	searchParams.append("id", dataSpaceConnectorId);
	return {
		headers: {
			location: `${baseRouteName}/${DATA_SPACE_CONNECTOR_ROUTE}?${searchParams.toString()}`
		},
		statusCode: HttpStatusCode.created
	};
}

/**
 * Get a list of the data space connector entries.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function dataSpaceConnectorList(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: IDataSpaceConnectorListRequest
): Promise<IDataSpaceConnectorListResponse> {
	const service = ComponentFactory.get<IFederatedCatalogueComponent>(factoryServiceName);

	const itemsAndCursor = await service.queryDataSpaceConnectors(
		request?.query.id,
		request?.query.maintainedBy,
		request?.query.cursor,
		Coerce.number(request?.query?.pageSize)
	);
	return {
		body: {
			...itemsAndCursor
		}
	};
}

/**
 * Get a Data Space Connector entry.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function dataSpaceConnectorGet(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ICatalogueEntryGetRequest
): Promise<IDataSpaceConnectorGetResponse | INotFoundResponse> {
	const service = ComponentFactory.get<IFederatedCatalogueComponent>(factoryServiceName);

	const id = request?.pathParams.id;
	Guards.stringValue(ROUTES_SOURCE, nameof(id), id);

	return {
		body: (await service.getEntry(GaiaXTypes.DataExchangeComponent, id)) as IDataSpaceConnectorEntry
	};
}
