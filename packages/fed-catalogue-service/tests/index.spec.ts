// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { StringHelper } from "@twin.org/core";
import { MemoryEntityStorageConnector } from "@twin.org/entity-storage-connector-memory";
import { EntityStorageConnectorFactory } from "@twin.org/entity-storage-models";
import type {
	DataResourceEntry,
	DataSpaceConnectorEntry,
	ParticipantEntry,
	ServiceOfferingEntry
} from "@twin.org/federated-catalogue-models";
import { ModuleHelper } from "@twin.org/modules";
import { nameof } from "@twin.org/nameof";

import { cleanupTestEnv, setupTestEnv } from "./setupTestEnv";

let participantStore: MemoryEntityStorageConnector<ParticipantEntry>;
let dataResourceStore: MemoryEntityStorageConnector<DataResourceEntry>;
let serviceOfferingStore: MemoryEntityStorageConnector<ServiceOfferingEntry>;
let dataSpaceConnectorStore: MemoryEntityStorageConnector<DataSpaceConnectorEntry>;

import { initSchema } from "../src/schema";

describe("federated-catalogue-service", () => {
	beforeAll(async () => {
		await setupTestEnv();

		initSchema();

		// Mock the module helper to execute the method in the same thread, so we don't have to create an engine
		ModuleHelper.execModuleMethodThread = vi
			.fn()
			.mockImplementation(async (module, method, args) =>
				ModuleHelper.execModuleMethod(module, method, args)
			);
	});

	afterAll(async () => {
		await cleanupTestEnv();
	});

	beforeEach(async () => {
		participantStore = new MemoryEntityStorageConnector<ParticipantEntry>({
			entitySchema: nameof<ParticipantEntry>()
		});

		dataResourceStore = new MemoryEntityStorageConnector<DataResourceEntry>({
			entitySchema: nameof<DataResourceEntry>()
		});

		serviceOfferingStore = new MemoryEntityStorageConnector<ServiceOfferingEntry>({
			entitySchema: nameof<ServiceOfferingEntry>()
		});

		dataSpaceConnectorStore = new MemoryEntityStorageConnector<DataSpaceConnectorEntry>({
			entitySchema: nameof<DataSpaceConnectorEntry>()
		});

		EntityStorageConnectorFactory.register(
			StringHelper.kebabCase(nameof<ParticipantEntry>()),
			() => participantStore
		);
		EntityStorageConnectorFactory.register(
			StringHelper.kebabCase(nameof<DataResourceEntry>()),
			() => dataResourceStore
		);
		EntityStorageConnectorFactory.register(
			StringHelper.kebabCase(nameof<ServiceOfferingEntry>()),
			() => serviceOfferingStore
		);
		EntityStorageConnectorFactory.register(
			StringHelper.kebabCase(nameof<DataSpaceConnectorEntry>()),
			() => dataSpaceConnectorStore
		);
	});

	test("This package currently has no tests", () => {});
});
