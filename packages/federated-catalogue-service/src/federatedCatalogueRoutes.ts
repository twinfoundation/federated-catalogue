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
import { Coerce, ComponentFactory, Guards, Is } from "@twin.org/core";
import type {
	ICompliancePresentationRequest,
	IDataResourceListRequest,
	IDataResourceListResponse,
	IDataSpaceConnectorListRequest,
	IDataSpaceConnectorListResponse,
	IFederatedCatalogue,
	IParticipantGetRequest,
	IParticipantGetResponse,
	IParticipantListRequest,
	IParticipantListResponse,
	IServiceOfferingListRequest,
	IServiceOfferingListResponse
} from "@twin.org/federated-catalogue-models";
import { nameof } from "@twin.org/nameof";
import { GaiaXTypes } from "@twin.org/standards-gaia-x";
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
								"@context": [
									"https://w3id.org/gaia-x/development",
									"https://schema.org",
									"https://www.w3.org/ns/credentials/v2"
								],
								entities: [
									{
										id: "did:iota:xxx",
										type: "LegalPerson",
										registrationNumber: {
											type: "LocalRegistrationNumber",
											local: "P1234567"
										},
										legalName: "A Inc.",
										trustedIssuerId: "did:iota:zzz",
										legalAddress: {
											type: "Address",
											countryCode: "KE"
										},
										validFrom: "2024-08-01T12:00:00Z",
										validUntil: "2025-08-01T12:00:00Z",
										dateCreated: "2024-08-02T13:45:00Z",
										evidences: ["https://credentials.example.org/1234567"]
									}
								],
								cursor: "1"
							}
						}
					}
				]
			}
		]
	};

	const getParticipantRoute: IRestRoute<
		IParticipantGetRequest,
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
			type: nameof<IParticipantGetRequest>(),
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
							body: {
								"@context": [
									"https://w3id.org/gaia-x/development",
									"https://schema.org",
									"https://www.w3.org/ns/credentials/v2"
								],
								id: "did:iota:xxx",
								type: "LegalPerson",
								registrationNumber: {
									type: "LocalRegistrationNumber",
									local: "P1234567"
								},
								legalName: "A Inc.",
								trustedIssuerId: "did:iota:zzz",
								legalAddress: {
									type: "Address",
									countryCode: "KE"
								},
								validFrom: "2024-08-01T12:00:00Z",
								validUntil: "2025-08-01T12:00:00Z",
								dateCreated: "2024-08-02T13:45:00Z",
								evidences: ["https://credentials.example.org/1234567"]
							}
						}
					}
				]
			}
		]
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
								"@context": [
									"https://w3id.org/gaia-x/development",
									"https://schema.org",
									"https://www.w3.org/ns/credentials/v2"
								],
								entities: [
									{
										id: "http://example.org/is123456",
										name: "Service 1",
										type: "ServiceOffering",
										servicePolicy: {},
										endpoint: {
											type: "Endpoint",
											endpointURL: "https://endpoint.example.org/api"
										},
										providedBy: "did:iota:1234567",
										validFrom: "2024-08-01T12:00:00Z",
										validUntil: "2025-08-01T12:00:00Z",
										dateCreated: "2024-08-02T13:45:00Z",
										evidences: ["https://credentials.example.org/1234567"]
									}
								],
								cursor: "1"
							}
						}
					}
				]
			}
		]
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
								"@context": [
									"https://w3id.org/gaia-x/development",
									"https://schema.org",
									"https://www.w3.org/ns/credentials/v2"
								],
								entities: [
									{
										id: "http://example.org/is123456",
										name: "Data Resource 1",
										type: "DataResource",
										copyrightOwnedBy: "did:iota:1234",
										license: "http://licenses.example.org/12345",
										resourcePolicy: {},
										exposedThrough: {
											"@id": "https://endpoint.example.org/api",
											type: "DataExchangeComponent"
										},
										producedBy: "did:iota:1234567",
										trustedIssuerId: "did:iota:987654",
										validFrom: "2024-08-01T12:00:00Z",
										validUntil: "2025-08-01T12:00:00Z",
										dateCreated: "2024-08-02T13:45:00Z",
										evidences: ["https://credentials.example.org/1234567"]
									}
								],
								cursor: "1"
							}
						}
					}
				]
			}
		]
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
								"@context": [
									"https://w3id.org/gaia-x/development",
									"https://schema.org",
									"https://www.w3.org/ns/credentials/v2"
								],
								entities: [
									{
										id: "https://my-ds-connectors.example.org/ds-connector-ABCD",
										type: ["DataSpaceConnector", "DataExchangeComponent"],
										identity: "did:iota:testnet:123456",
										defaultEndpoint: {
											endpointURL: "https://my-twin-node.example.org:9000/twin-ds-connector"
										},
										subscriptionActivityEndpoint: {
											endpointURL: "/subscriptions"
										},
										pushActivityEndpoint: {
											endpointURL: "/notify"
										},
										pullDataEndpoint: {
											endpointURL: "/data"
										},
										offeredResource: ["https://my-data-resource.example.org"],
										trustedIssuerId: "did:iota:987654",
										validFrom: "2024-08-01T12:00:00Z",
										validUntil: "2025-08-01T12:00:00Z",
										dateCreated: "2024-08-02T13:45:00Z",
										evidences: ["https://credentials.example.org/1234567"]
									}
								],
								cursor: "1"
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
		listDataResourcesRoute,
		listDataSpaceConnectorsRoute
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

	const service = ComponentFactory.get<IFederatedCatalogue>(factoryServiceName);
	const participantId = await service.registerComplianceCredential(request.body);

	return {
		headers: {
			location: `${baseRouteName}/${PARTICIPANTS_ROUTE}/${participantId}`
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
	const service = ComponentFactory.get<IFederatedCatalogue>(factoryServiceName);

	const itemsAndCursor = await service.queryParticipants(
		request?.query?.id,
		request?.query?.registrationNumber,
		request?.query?.lrnType,
		request?.query?.cursor,
		Coerce.number(request?.query?.pageSize)
	);
	return {
		body: {
			"@context": [
				"https://w3id.org/gaia-x/development",
				"https://schema.org",
				"https://www.w3.org/ns/credentials/v2"
			],
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
	request: IParticipantGetRequest
): Promise<IParticipantGetResponse | INotFoundResponse> {
	const service = ComponentFactory.get<IFederatedCatalogue>(factoryServiceName);

	const id = request?.pathParams.id;
	Guards.stringValue(ROUTES_SOURCE, nameof(id), id);

	const itemsAndCursor = await service.queryParticipants(request?.pathParams.id);

	if (Is.arrayValue(itemsAndCursor.entities)) {
		return {
			body: {
				...itemsAndCursor.entities[0],
				type: GaiaXTypes.Participant,
				"@context": [
					"https://w3id.org/gaia-x/development",
					"https://schema.org",
					"https://www.w3.org/ns/credentials/v2"
				]
			}
		};
	}

	return {
		statusCode: HttpStatusCode.notFound,
		body: {
			name: "notFoundEntry",
			message: "notFoundEntry",
			notFoundId: id
		}
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

	const service = ComponentFactory.get<IFederatedCatalogue>(factoryServiceName);
	const serviceOfferingsCreated = await service.registerServiceOfferingCredential(request.body);

	return {
		headers: {
			location: `${baseRouteName}/${SERVICE_OFFERING_ROUTE}/${serviceOfferingsCreated[0]}`
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
	const service = ComponentFactory.get<IFederatedCatalogue>(factoryServiceName);

	const itemsAndCursor = await service.queryServiceOfferings(
		request?.query.id,
		request?.query.providedBy,
		request?.query.cursor,
		Coerce.number(request?.query?.pageSize)
	);
	return {
		body: {
			"@context": [
				"https://w3id.org/gaia-x/development",
				"https://schema.org",
				"https://www.w3.org/ns/credentials/v2"
			],
			...itemsAndCursor
		}
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

	const service = ComponentFactory.get<IFederatedCatalogue>(factoryServiceName);
	const dataResourcesCreated = await service.registerDataResourceCredential(request.body);

	return {
		headers: {
			location: `${baseRouteName}/${DATA_RESOURCE_ROUTE}/${dataResourcesCreated[0]}`
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
	const service = ComponentFactory.get<IFederatedCatalogue>(factoryServiceName);

	const itemsAndCursor = await service.queryDataResources(
		request?.query.id,
		request?.query.producedBy,
		request?.query.cursor,
		Coerce.number(request?.query?.pageSize)
	);
	return {
		body: {
			"@context": [
				"https://w3id.org/gaia-x/development",
				"https://schema.org",
				"https://www.w3.org/ns/credentials/v2"
			],
			...itemsAndCursor
		}
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

	const service = ComponentFactory.get<IFederatedCatalogue>(factoryServiceName);
	const dataSpaceConnectorId = await service.registerDataSpaceConnectorCredential(request.body);

	return {
		headers: {
			location: `${baseRouteName}/${DATA_SPACE_CONNECTOR_ROUTE}/${dataSpaceConnectorId}`
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
	const service = ComponentFactory.get<IFederatedCatalogue>(factoryServiceName);

	const itemsAndCursor = await service.queryDataSpaceConnectors(
		request?.query.id,
		request?.query.maintainedBy,
		request?.query.cursor,
		Coerce.number(request?.query?.pageSize)
	);
	return {
		body: {
			"@context": [
				"https://w3id.org/gaia-x/development",
				"https://schema.org",
				"https://www.w3.org/ns/credentials/v2"
			],
			...itemsAndCursor
		}
	};
}
