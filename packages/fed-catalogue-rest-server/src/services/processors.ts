// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	AuthHeaderProcessor,
	EntityStorageAuthenticationService,
	initSchema as initSchemaAuthEntityStorage,
	type AuthenticationUser
} from "@gtsc/api-auth-entity-storage-service";
import type { IHttpRestRouteProcessor } from "@gtsc/api-models";
import { LoggingProcessor, RouteProcessor, SystemIdentityProcessor } from "@gtsc/api-processors";
import { GeneralError } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { ServiceFactory, type IService } from "@gtsc/services";
import { initialiseEntityStorageConnector } from "./entityStorage.js";
import type { IOptions } from "../models/IOptions.js";

export const AUTH_SERVICE_NAME = "authentication";
export const AUTH_SIGNING_NAME_VAULT_KEY = "signing";

/**
 * Build the processor for the REST routes.
 * @param options The options for the web server.
 * @param services The services.
 * @returns The REST route processors.
 * @throws If the processor type is unknown.
 */
export function buildProcessors(
	options: IOptions,
	services: IService[]
): IHttpRestRouteProcessor[] {
	const restRouteProcessors: IHttpRestRouteProcessor[] = [];

	restRouteProcessors.push(
		new LoggingProcessor({
			loggingConnectorType: options.systemLoggingConnectorName,
			config: {
				includeBody: options.debug
			}
		})
	);

	restRouteProcessors.push(new SystemIdentityProcessor());

	buildAuthProcessors(options, restRouteProcessors, services);

	restRouteProcessors.push(
		new RouteProcessor({
			config: {
				includeErrorStack: options.debug
			}
		})
	);

	services.push(...restRouteProcessors);

	return restRouteProcessors;
}

/**
 * Build the authentication pre processors.
 * @param options The options for the web server.
 * @param restRouteProcessors The REST route processors.
 * @param services The services.
 * @throws If the auth processor type is unknown.
 */
function buildAuthProcessors(
	options: IOptions,
	restRouteProcessors: IHttpRestRouteProcessor[],
	services: IService[]
): void {
	if (options.envVars.SERVER_AUTH_PROCESSOR_TYPE === "entity-storage") {
		initSchemaAuthEntityStorage();
		initialiseEntityStorageConnector(
			options,
			services,
			options.envVars.SERVER_AUTH_USER_ENTITY_STORAGE_TYPE,
			nameof<AuthenticationUser>()
		);

		const authenticationService = new EntityStorageAuthenticationService({
			vaultConnectorType: options.envVars.SERVER_VAULT_CONNECTOR,
			config: {
				signingKeyName: AUTH_SIGNING_NAME_VAULT_KEY
			}
		});
		services.push(authenticationService);

		ServiceFactory.register(AUTH_SERVICE_NAME, () => authenticationService);

		restRouteProcessors.push(
			new AuthHeaderProcessor({
				vaultConnectorType: options.envVars.SERVER_VAULT_CONNECTOR,
				config: {
					signingKeyName: AUTH_SIGNING_NAME_VAULT_KEY
				}
			})
		);
	} else {
		throw new GeneralError("apiServer", "processorUnknownType", {
			type: options.envVars.SERVER_AUTH_PROCESSOR_TYPE,
			processorType: "authProcessor"
		});
	}
}
