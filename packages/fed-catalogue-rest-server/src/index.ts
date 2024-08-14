// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IServerInfo } from "@gtsc/api-models";
import { CLIDisplay } from "@gtsc/cli-core";
import { BaseError, I18n, Is } from "@gtsc/core";
import type { IService } from "@gtsc/services";
import { configure, findRootPackageFolder } from "./configure.js";
import { initialiseLocales } from "./locales.js";
import { buildRoutes } from "./routes.js";
import { startWebServer } from "./server.js";
import { initialiseFederatedCatalogueService } from "./services/federatedCatalogue.js";
import {
	initialiseLoggingConnectorFactory,
	initialiseLoggingService,
	initialiseSystemLoggingConnector,
	systemLogError,
	systemLogInfo
} from "./services/logging.js";

try {
	const serverInfo: IServerInfo = {
		name: "Federated Catalogue Server",
		version: "0.0.1"
	};

	CLIDisplay.header(serverInfo.name, serverInfo.version, "🌩️ ");

	const rootPackageFolder = findRootPackageFolder();
	await initialiseLocales(rootPackageFolder);

	const options = await configure(rootPackageFolder);

	if (options.debug) {
		CLIDisplay.value(I18n.formatMessage("apiServer.debuggingEnabled"), "true");
		CLIDisplay.break();
	}

	const services: IService[] = [];
	initialiseSystemLoggingConnector(options, services);

	initialiseLoggingConnectorFactory(options, services);
	initialiseLoggingService(options, services);

	// Service initialization
	initialiseFederatedCatalogueService(options, services);

	for (const service of services) {
		if (Is.function(service.start)) {
			systemLogInfo(I18n.formatMessage("apiServer.starting", { element: service.CLASS_NAME }));
			await service.start(options.systemConfig.systemIdentity, options.systemLoggingConnectorName);
		}
	}

	await startWebServer(options, [], buildRoutes(), async () => {
		for (const service of services) {
			if (Is.function(service.stop)) {
				systemLogInfo(I18n.formatMessage("apiServer.stopping", { element: service.CLASS_NAME }));
				await service.stop(options.systemConfig.systemIdentity, options.systemLoggingConnectorName);
			}
		}
	});
} catch (err) {
	systemLogError(BaseError.fromError(err));
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
}
