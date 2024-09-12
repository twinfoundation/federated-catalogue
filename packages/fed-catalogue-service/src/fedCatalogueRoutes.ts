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
	IParticipantListResponse
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
	const createRoute: IRestRoute<ICompliancePresentationRequest, ICreatedResponse> = {
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

	const listRoute: IRestRoute<IParticipantListRequest, IParticipantListResponse> = {
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
							legalRegistrationNumber: "abc"
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
								entities: [
									{
										participantId: "did:iota:xxx",
										legalRegistrationNumber: "zzz",
										legalName: "A Inc.",
										lrnType: "VAT_ID",
										trustedIssuerId: "did:iota:zzz",
										countryCode: "KE",
										validFrom: "2024-08-01T12:00:00Z",
										validUntil: "2025-08-01T12:00:00Z",
										dateCreated: "2024-08-02T13:45:00Z"
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

	return [createRoute, listRoute];
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
	Guards.string(ROUTES_SOURCE, nameof(request.body), request.body);

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

	const itemsAndCursor = await service.query(
		request?.query.participantId,
		request?.query?.legalRegistrationNumber,
		request?.query?.lrnType,
		request?.query?.cursor,
		Coerce.number(request?.query?.pageSize)
	);
	return {
		body: itemsAndCursor
	};
}
