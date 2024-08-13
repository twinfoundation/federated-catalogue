// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IWebServerOptions } from "@gtsc/api-models";
import type { ISystemConfig } from "./ISystemConfig";

/**
 * The options for the API server.
 */
export interface IOptions {
	/**
	 * The options for the web server.
	 */
	webServerOptions: IWebServerOptions;

	/**
	 * The root package folder.
	 */
	rootPackageFolder: string;

	/**
	 * Whether to run in debug mode.
	 */
	debug: boolean;

	/**
	 * Whether to bootstrap the application.
	 */
	bootstrap: boolean;

	/**
	 * The environment variables.
	 */
	envVars: { [id: string]: string };

	/**
	 * The root storage folder.
	 */
	storageFileRoot: string;

	/**
	 * The name of the system config file.
	 */
	systemConfigFilename: string;

	/**
	 * The name of the connector to use for system logging.
	 */
	systemLoggingConnectorName: string;

	/**
	 * The system config.
	 */
	systemConfig: ISystemConfig;
}
