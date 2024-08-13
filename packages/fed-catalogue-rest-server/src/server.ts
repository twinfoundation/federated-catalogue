// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHttpRestRouteProcessor, IRestRoute } from "@gtsc/api-models";
import { FastifyWebServer } from "@gtsc/api-server-fastify";
import { Is } from "@gtsc/core";
import type { IOptions } from "./models/IOptions";

/**
 * Starts the web server.
 * @param options The options for the web server.
 * @param restRouteProcessors The REST route processors.
 * @param routes The routes to serve.
 * @param stopCallback Callback to call when the server is stopped.
 */
export async function startWebServer(
	options: IOptions,
	restRouteProcessors: IHttpRestRouteProcessor[],
	routes: IRestRoute[],
	stopCallback?: () => Promise<void>
): Promise<void> {
	const webServer = new FastifyWebServer({
		loggingConnectorType: options.systemLoggingConnectorName
	});

	await webServer.build(restRouteProcessors, routes, options.webServerOptions);
	await webServer.start();

	for (const signal of ["SIGHUP", "SIGINT", "SIGTERM"]) {
		process.on(signal, async () => {
			webServer.stop();
			if (Is.function(stopCallback)) {
				await stopCallback();
			}
		});
	}
}
