// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { EnvHelper, RandomHelper } from "@twin.org/core";
import * as dotenv from "dotenv";

console.debug("Setting up test environment from .env and .env.dev files");

dotenv.config({
	path: [path.join(__dirname, ".env-test"), path.join(__dirname, ".env.dev")]
});

/**
 * Setup the test environment.
 * @returns the Clearing House Approver list.
 */
export async function setupTestEnv(): Promise<string[]> {
	await cleanupTestEnv();

	const envVars = EnvHelper.envToJson(process.env, "FEDERATED_CATALOGUE");

	RandomHelper.generate = vi
		.fn()
		.mockImplementationOnce(length => new Uint8Array(length).fill(99))
		.mockImplementation(length => new Uint8Array(length).fill(88));

	return JSON.parse(envVars.clearingHouseApproverList) as string[];
}

/**
 * Cleanup the test environment.
 */
export async function cleanupTestEnv(): Promise<void> {
	try {
	} catch {}
}
