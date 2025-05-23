// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-console */
import path from "node:path";
import type { IServerInfo } from "@twin.org/api-models";
import { BaseError, EnvHelper, Is } from "@twin.org/core";
import * as dotenv from "dotenv";
import type { IFederatedCatalogVariables } from "./models/IFederatedCatalogVariables.js";
import { start } from "./server.js";
import { findRootPackageFolder, initialiseLocales } from "./utils.js";

try {
	const serverInfo: IServerInfo = {
		name: "Federated Catalogue Server",
		version: "0.0.1-next.6" // x-release-please-version
	};

	console.log(`\u001B[4m🌩️  ${serverInfo.name} v${serverInfo.version}\u001B[24m\n`);

	const rootPackageFolder = findRootPackageFolder();
	await initialiseLocales(rootPackageFolder);

	dotenv.config({
		path: [path.join(rootPackageFolder, ".env"), path.join(rootPackageFolder, ".env.local")]
	});

	const envVars = EnvHelper.envToJson<IFederatedCatalogVariables>(
		process.env,
		"FEDERATED_CATALOGUE"
	);

	const startResult = await start(serverInfo, envVars, rootPackageFolder);

	if (!Is.empty(startResult)) {
		for (const signal of ["SIGHUP", "SIGINT", "SIGTERM"]) {
			process.on(signal, async () => {
				await startResult.server.stop();
			});
		}
	}
} catch (err) {
	console.error(BaseError.fromError(err));
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
}
