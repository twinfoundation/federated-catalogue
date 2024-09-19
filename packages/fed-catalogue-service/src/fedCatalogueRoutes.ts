// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	ICreatedResponse,
	IHttpRequestContext,
	IRestRoute,
	ITag,
	IUnprocessableEntityResponse
} from "@gtsc/api-models";
import { Coerce, Guards } from "@gtsc/core";
import type {
	ICompliancePresentationRequest,
	IFederatedCatalogue,
	IParticipantListRequest,
	IParticipantListResponse,
	IServiceDescriptionListRequest,
	IServiceDescriptionListResponse,
	IServiceDescriptionPresentationRequest
} from "@gtsc/fed-catalogue-models";
import { nameof } from "@gtsc/nameof";
import { ServiceFactory } from "@gtsc/services";
import { HttpStatusCode } from "@gtsc/web";

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

	const createServiceRoute: IRestRoute<IServiceDescriptionPresentationRequest, ICreatedResponse> = {
		operationId: "serviceDescriptionPresentationRequest",
		summary: "Present a Service Description Credential",
		tag: tagsFedCatalogue[0].name,
		method: "POST",
		path: `${baseRouteName}/service-credentials`,
		handler: async (httpRequestContext, request) =>
			serviceDescriptionCredentialPresentation(httpRequestContext, factoryServiceName, request),
		requestType: {
			mimeType: "application/jwt",
			type: nameof<IServiceDescriptionPresentationRequest>(),
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
										type: "Participant",
										registrationNumber: "zzz",
										legalName: "A Inc.",
										lrnType: "VAT_ID",
										trustedIssuerId: "did:iota:zzz",
										countryCode: "KE",
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

	const listServicesRoute: IRestRoute<
		IServiceDescriptionListRequest,
		IServiceDescriptionListResponse
	> = {
		operationId: "fedCatalogueListServices",
		summary: "Get a list of the service entries",
		tag: tagsFedCatalogue[0].name,
		method: "GET",
		path: `${baseRouteName}/services`,
		handler: async (httpRequestContext, request) =>
			serviceDescriptionList(httpRequestContext, factoryServiceName, request),
		requestType: {
			type: nameof<IServiceDescriptionListRequest>(),
			examples: [
				{
					id: "serviceListRequestExample",
					request: {
						query: {
							provider: "did:iota:1234"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<IServiceDescriptionListResponse>(),
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
										endpointURL: "https://endpoint.example.org/api",
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

	return [createParticipantRoute, listParticipantsRoute, createServiceRoute, listServicesRoute];
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

	const service = ServiceFactory.get<IFederatedCatalogue>(factoryServiceName);
	await service.registerComplianceCredential(request.body);

	return {
		headers: {
			Location: ""
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
	const service = ServiceFactory.get<IFederatedCatalogue>(factoryServiceName);

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
 * Register a new service description.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function serviceDescriptionCredentialPresentation(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ICompliancePresentationRequest
): Promise<ICreatedResponse> {
	Guards.object<ICompliancePresentationRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.stringValue(ROUTES_SOURCE, nameof(request.body), request.body);

	const service = ServiceFactory.get<IFederatedCatalogue>(factoryServiceName);
	await service.registerServiceDescriptionCredential(request.body);

	return {
		headers: {
			Location: ""
		},
		statusCode: HttpStatusCode.created
	};
}

/**
 * Get a list of the service description entries.
 * @param httpRequestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function serviceDescriptionList(
	httpRequestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: IServiceDescriptionListRequest
): Promise<IServiceDescriptionListResponse> {
	const service = ServiceFactory.get<IFederatedCatalogue>(factoryServiceName);

	const itemsAndCursor = await service.queryServiceDescriptions(
		request?.query.provider,
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
