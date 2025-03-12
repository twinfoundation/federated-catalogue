// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	ICreatedResponse,
	IHttpRequestContext,
	IRestRoute,
	ITag,
	IUnprocessableEntityResponse
} from "@twin.org/api-models";
import { Coerce, ComponentFactory, Guards } from "@twin.org/core";
import type {
	ICompliancePresentationRequest,
	IDataResourceListRequest,
	IDataResourceListResponse,
	IDataSpaceConnectorListRequest,
	IDataSpaceConnectorListResponse,
	IFederatedCatalogue,
	IParticipantListRequest,
	IParticipantListResponse,
	IServiceOfferingListRequest,
	IServiceOfferingListResponse
} from "@twin.org/federated-catalogue-models";
import { nameof } from "@twin.org/nameof";
import { HttpStatusCode } from "@twin.org/web";

/**
 * The source used when communicating about these routes.
 */
const ROUTES_SOURCE = "fedCatalogueRoutes";

/**
 * The tag to associate with the routes.
 */
export const tagsFedCatalogue: ITag[] = [
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
export function generateRestRoutesFedCatalogue(
	baseRouteName: string,
	factoryServiceName: string
): IRestRoute[] {
	const createParticipantRoute: IRestRoute<ICompliancePresentationRequest, ICreatedResponse> = {
		operationId: "compliancePresentationRequest",
		summary: "Present a Compliance Credential",
		tag: tagsFedCatalogue[0].name,
		method: "POST",
		path: `${baseRouteName}/participant-credentials`,
		handler: async (httpRequestContext, request) =>
			complianceCredentialPresentation(httpRequestContext, factoryServiceName, request),
		requestType: {
			mimeType: "application/jwt",
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

	const createServiceRoute: IRestRoute<ICompliancePresentationRequest, ICreatedResponse> = {
		operationId: "serviceOfferingPresentationRequest",
		summary: "Present a Service Offering Credential",
		tag: tagsFedCatalogue[0].name,
		method: "POST",
		path: `${baseRouteName}/service-credentials`,
		handler: async (httpRequestContext, request) =>
			serviceOfferingCredentialPresentation(httpRequestContext, factoryServiceName, request),
		requestType: {
			mimeType: "application/jwt",
			type: nameof<ICompliancePresentationRequest>(),
			examples: [
				{
					id: "servicePresentationRequestExample",
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
		operationId: "dataspaceConnectorPresentationRequest",
		summary: "Present a Data Space Connector Credential",
		tag: tagsFedCatalogue[0].name,
		method: "POST",
		path: `${baseRouteName}/data-space-connectors`,
		handler: async (httpRequestContext, request) =>
			dataSpaceConnectorCredentialPresentation(httpRequestContext, factoryServiceName, request),
		requestType: {
			mimeType: "application/jwt",
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
		operationId: "datasResourcePresentationRequest",
		summary: "Present a Data Resource Credential",
		tag: tagsFedCatalogue[0].name,
		method: "POST",
		path: `${baseRouteName}/data-resources`,
		handler: async (httpRequestContext, request) =>
			dataResourceCredentialPresentation(httpRequestContext, factoryServiceName, request),
		requestType: {
			mimeType: "application/jwt",
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
		operationId: "fedCatalogueListParticipants",
		summary: "Get a list of the participant entries",
		tag: tagsFedCatalogue[0].name,
		method: "GET",
		path: `${baseRouteName}/participants`,
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
						id: "listResponseExample",
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

	const listServicesRoute: IRestRoute<IServiceOfferingListRequest, IServiceOfferingListResponse> = {
		operationId: "fedCatalogueListServices",
		summary: "Get a list of the service entries",
		tag: tagsFedCatalogue[0].name,
		method: "GET",
		path: `${baseRouteName}/services`,
		handler: async (httpRequestContext, request) =>
			serviceOfferingList(httpRequestContext, factoryServiceName, request),
		requestType: {
			type: nameof<IServiceOfferingListRequest>(),
			examples: [
				{
					id: "serviceListRequestExample",
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
						id: "listResponseExample",
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
		operationId: "fedCatalogueListResources",
		summary: "Get a list of the data resource entries",
		tag: tagsFedCatalogue[0].name,
		method: "GET",
		path: `${baseRouteName}/data-resources`,
		handler: async (httpRequestContext, request) =>
			dataResourceList(httpRequestContext, factoryServiceName, request),
		requestType: {
			type: nameof<IDataResourceListRequest>(),
			examples: [
				{
					id: "resourceListRequestExample",
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
						id: "listResponseExample",
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
		operationId: "fedCatalogueListDataSpaceConnectors",
		summary: "Get a list of the Data Space connectors entries",
		tag: tagsFedCatalogue[0].name,
		method: "GET",
		path: `${baseRouteName}/data-space-connectors`,
		handler: async (httpRequestContext, request) =>
			dataSpaceConnectorList(httpRequestContext, factoryServiceName, request),
		requestType: {
			type: nameof<IDataSpaceConnectorListRequest>(),
			examples: [
				{
					id: "resourceListRequestExample",
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
						id: "listResponseExample",
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
		createServiceRoute,
		createDataResourceRoute,
		createDataSpaceConnectorRoute,
		listParticipantsRoute,
		listServicesRoute,
		listDataResourcesRoute,
		listDataSpaceConnectorsRoute
	];
}

/**
 * Register a new participant.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function complianceCredentialPresentation(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ICompliancePresentationRequest
): Promise<ICreatedResponse> {
	Guards.object<ICompliancePresentationRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.body), request.body);

	const service = ComponentFactory.get<IFederatedCatalogue>(factoryServiceName);
	await service.registerComplianceCredential(request.body);

	return {
		headers: {
			location: ""
		},
		statusCode: HttpStatusCode.created
	};
}

/**
 * Get a list of the logging participant entries.
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
 * Register a new service offering.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function serviceOfferingCredentialPresentation(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ICompliancePresentationRequest
): Promise<ICreatedResponse> {
	Guards.object<ICompliancePresentationRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.body), request.body);

	const service = ComponentFactory.get<IFederatedCatalogue>(factoryServiceName);
	await service.registerServiceOfferingCredential(request.body);

	return {
		headers: {
			location: ""
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
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function dataResourceCredentialPresentation(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ICompliancePresentationRequest
): Promise<ICreatedResponse> {
	Guards.object<ICompliancePresentationRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.body), request.body);

	const service = ComponentFactory.get<IFederatedCatalogue>(factoryServiceName);
	await service.registerDataResourceCredential(request.body);

	return {
		headers: {
			location: ""
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
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function dataSpaceConnectorCredentialPresentation(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ICompliancePresentationRequest
): Promise<ICreatedResponse> {
	Guards.object<ICompliancePresentationRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.body), request.body);

	const service = ComponentFactory.get<IFederatedCatalogue>(factoryServiceName);
	await service.registerDataSpaceConnectorCredential(request.body);

	return {
		headers: {
			location: ""
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
