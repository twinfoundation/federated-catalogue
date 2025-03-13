// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { RandomHelper } from "@twin.org/core";
import { Bip39 } from "@twin.org/crypto";
import { MemoryEntityStorageConnector } from "@twin.org/entity-storage-connector-memory";
import { EntityStorageConnectorFactory } from "@twin.org/entity-storage-models";
import {
	type IdentityDocument,
	initSchema as initSchemaIdentity
} from "@twin.org/identity-connector-entity-storage";
import { nameof } from "@twin.org/nameof";
import * as dotenv from "dotenv";

console.debug("Setting up test environment from .env and .env.dev files");

dotenv.config({ path: [path.join(__dirname, ".env"), path.join(__dirname, ".env.dev")] });

const TEST_FOLDER = "./tests/.tmp";

initSchemaIdentity();

const identityDocumentEntityStorage = new MemoryEntityStorageConnector<IdentityDocument>({
	entitySchema: nameof<IdentityDocument>()
});
EntityStorageConnectorFactory.register("identity-document", () => identityDocumentEntityStorage);

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
	Bip39.randomMnemonic = vi
		.fn()
		.mockImplementation(
			() =>
				"elder blur tip exact organ pipe other same minute grace conduct father brother prosper tide icon pony suggest joy provide dignity domain nominee liquid"
		);
}

/**
 * Cleanup the test environment.
 */
export async function cleanupTestEnv(): Promise<void> {
	try {
		await rm(TEST_FOLDER, { recursive: true });
	} catch {}
}
