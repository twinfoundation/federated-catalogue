// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { RandomHelper } from "@twin.org/core";
import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";

console.debug("Setting up test environment from .env and .env.dev files");

const dotEnvConfig = dotenv.config({
	path: [path.join(__dirname, ".env-test"), path.join(__dirname, ".env.dev")]
});
dotenvExpand.expand(dotEnvConfig);

const TEST_FOLDER = "./tests/.tmp";

/**
 * Setup the test environment.
 */
export async function setupTestEnv(): Promise<void> {
	await cleanupTestEnv();
	await mkdir(TEST_FOLDER, { recursive: true });

	RandomHelper.generate = vi
		.fn()
		.mockImplementationOnce(length => new Uint8Array(length).fill(99))
		.mockImplementation(length => new Uint8Array(length).fill(88));
}

/**
 * Cleanup the test environment.
 */
export async function cleanupTestEnv(): Promise<void> {
	try {
		await rm(TEST_FOLDER, { recursive: true });
	} catch {}
}
