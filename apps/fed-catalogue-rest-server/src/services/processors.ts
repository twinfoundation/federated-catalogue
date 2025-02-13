// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IHttpRestRouteProcessor } from "@gtsc/api-models";
import { LoggingProcessor, RouteProcessor } from "@gtsc/api-processors";
import type { IService } from "@gtsc/services";
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
