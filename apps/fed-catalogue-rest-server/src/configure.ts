// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { IWebServerOptions } from "@gtsc/api-models";
import { CLIUtils } from "@gtsc/cli-core";
import { Coerce, GeneralError, Is } from "@gtsc/core";
import type { HttpMethod } from "@gtsc/web";
import * as dotenv from "dotenv";
import type { IOptions } from "./models/IOptions";
import type { ISystemConfig } from "./models/ISystemConfig";

export const DEFAULT_SYSTEM_CONFIG_FILENAME = "system-config.json";

/**
 * Find the root package folder.
 * @returns The root package folder.
 */
export function findRootPackageFolder(): string {
	// Find the root package folder.
	const rootPackageFolder = path.resolve(
		path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..")
	);

	return rootPackageFolder;
}

/**
 * Handles the configuration of the application.
 * @param rootPackageFolder The root package folder.
 * @returns The configuration options.
 */
export async function configure(rootPackageFolder: string): Promise<IOptions> {
	// Import environment variables from .env files.
	dotenv.config({
		path: [path.join(rootPackageFolder, ".env")]
	});

	const envVars: { [id: string]: string } = {};
	for (const envVar in process.env) {
		if (envVar.startsWith("SERVER_")) {
			envVars[envVar] = process.env[envVar] ?? "";
		}
	}

	if (!Is.objectValue(envVars)) {
		throw new GeneralError("apiServer", "noEnvVars");
	}

	const storageFileRoot = envVars.SERVER_STORAGE_FILE_ROOT;
	if (!Is.stringValue(storageFileRoot)) {
		throw new GeneralError("apiServer", "storageFileRootNotSet");
	}

	const webServerOptions: IWebServerOptions = {
		port: Coerce.number(envVars.SERVER_PORT),
		host: Coerce.string(envVars.SERVER_HOST),
		methods: Is.stringValue(envVars.SERVER_HTTP_METHODS)
			? (envVars.SERVER_HTTP_METHODS.split(",") as HttpMethod[])
			: undefined,
		allowedHeaders: Is.stringValue(envVars.SERVER_HTTP_ALLOWED_HEADERS)
			? envVars.SERVER_HTTP_ALLOWED_HEADERS.split(",")
			: undefined,
		exposedHeaders: Is.stringValue(envVars.SERVER_) ? envVars.SERVER_.split(",") : undefined,
		corsOrigins: Is.stringValue(envVars.SERVER_CORS_ORIGINS)
			? envVars.SERVER_CORS_ORIGINS.split(",")
			: undefined
	};

	const systemConfigFilename =
		envVars.SERVER_SYSTEM_CONFIG_FILENAME ?? DEFAULT_SYSTEM_CONFIG_FILENAME;
	const systemConfig = (await readSystemConfig(storageFileRoot, systemConfigFilename)) ?? {
		systemIdentity: ""
	};
	// If there is no system identity then we need to bootstrap the system.
	const bootstrap = !Is.stringValue(systemConfig.systemIdentity);

	return {
		webServerOptions,
		rootPackageFolder,
		debug: Coerce.boolean(envVars.SERVER_DEBUG) ?? false,
		bootstrap,
		envVars,
		storageFileRoot,
		systemConfigFilename,
		systemConfig,
		systemLoggingConnectorName: envVars.SERVER_SYSTEM_LOGGING_CONNECTOR_NAME ?? "system"
	};
}

/**
 * Read the system configuration.
 * @param storageFileRoot The root of the storage files.
 * @param systemConfigFilename The system config filename.
 * @returns The system configuration.
 */
export async function readSystemConfig(
	storageFileRoot: string,
	systemConfigFilename: string
): Promise<ISystemConfig | undefined> {
	const fullSystemConfigFilename = path.join(storageFileRoot, systemConfigFilename);

	return CLIUtils.readJsonFile<ISystemConfig>(fullSystemConfigFilename);
}

/**
 * Write the system configuration.
 * @param storageFileRoot The root of the storage files.
 * @param systemConfigFilename The system config filename.
 * @param systemConfig The system configuration.
 */
export async function writeSystemConfig(
	storageFileRoot: string,
	systemConfigFilename: string,
	systemConfig: ISystemConfig
): Promise<void> {
	const fullSystemConfigFilename = path.join(storageFileRoot, systemConfigFilename);

	await CLIUtils.writeJsonFile(fullSystemConfigFilename, systemConfig, false);
}
