// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import fs from "node:fs";
import path from "node:path";

import { EnvHelper, StringHelper } from "@twin.org/core";
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

import { FederatedCatalogueService } from "../src/federatedCatalogueService";
import type { IFederatedCatalogueOptions } from "../src/IFederatedCatalogueOptions";
import { initSchema } from "../src/schema";

import dataResourceCredential from "./dataset/credentials/compliance/data-resource-credential.json" assert { type: "json" };
import dataSpaceConnectorCredential from "./dataset/credentials/compliance/data-space-connector-credential.json" assert { type: "json" };
import participantCredential from "./dataset/credentials/compliance/participant-credential.json" assert { type: "json" };
import serviceOfferingCedential from "./dataset/credentials/compliance/service-offering-credential.json" assert { type: "json" };

let participantStore: MemoryEntityStorageConnector<ParticipantEntry>;
let dataResourceStore: MemoryEntityStorageConnector<DataResourceEntry>;
let serviceOfferingStore: MemoryEntityStorageConnector<ServiceOfferingEntry>;
let dataSpaceConnectorStore: MemoryEntityStorageConnector<DataSpaceConnectorEntry>;

let envVars: { [id: string]: string };

import { cleanupTestEnv, setupTestEnv } from "./setupTestEnv";

let options: IFederatedCatalogueOptions;

describe("federated-catalogue-service", () => {
	beforeAll(async () => {
		await setupTestEnv();

		envVars = EnvHelper.envToJson(process.env, "FED_CATALOG");

		// Mock the module helper to execute the method in the same thread, so we don't have to create an engine
		ModuleHelper.execModuleMethodThread = vi
			.fn()
			.mockImplementation(async (module, method, args) =>
				ModuleHelper.execModuleMethod(module, method, args)
			);

		const originalFetch = globalThis.fetch;

		globalThis.fetch = vi.fn().mockImplementation(async (request: { url: string } | string) => {
			const url = typeof request === "string" ? request : request.url;
			if (url.includes("uni-resolver") || url.includes("w3.org")) {
				return originalFetch(url);
			}
			const fileName = path.basename(new URL(url).pathname);
			const pathToFile = path.join(
				__dirname,
				"..",
				"..",
				"..",
				"docs",
				"public-web",
				"test-credentials",
				fileName
			);
			const contentBuffer = await fs.readFileSync(pathToFile);
			const content = contentBuffer.toString();
			return {
				status: 200,
				ok: true,
				headers: { "Content-Type": "application/json", "Content-Length": content.length },
				json: async () => new Promise(resolve => resolve(JSON.parse(content)))
			};
		});

		initSchema();

		options = {
			loggingConnectorType: "console",
			didResolverEndpoint: envVars.resolverEndpoint,
			// Check for support of multiple values from env vars
			clearingHouseWhiteList: JSON.parse(envVars.clearingHouseWhitelist) as string[]
		};
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

	test("It should register a compliant Participant", async () => {
		const fedCatalogueService = new FederatedCatalogueService(options);
		await fedCatalogueService.registerComplianceCredential(participantCredential.jwtCredential);
		const queryResult = await fedCatalogueService.queryParticipants();
		expect(queryResult.entities.length).toBe(1);

		expect(queryResult.entities[0].id).toBe(participantCredential.credential.credentialSubject.id);
	});

	test("It should register a compliant Data Resource", async () => {
		const fedCatalogueService = new FederatedCatalogueService(options);
		// The Participant first must exist
		await fedCatalogueService.registerComplianceCredential(participantCredential.jwtCredential);

		await fedCatalogueService.registerDataResourceCredential(dataResourceCredential.jwtCredential);
		const queryResult = await fedCatalogueService.queryDataResources();
		expect(queryResult.entities.length).toBe(1);

		expect(queryResult.entities[0].id).toBe(dataResourceCredential.credential.credentialSubject.id);
	});

	test("It should register a compliant Service Offering", async () => {
		const fedCatalogueService = new FederatedCatalogueService(options);
		// The Participant first must exist
		await fedCatalogueService.registerComplianceCredential(participantCredential.jwtCredential);

		await fedCatalogueService.registerServiceOfferingCredential(
			serviceOfferingCedential.jwtCredential
		);
		const queryResult = await fedCatalogueService.queryServiceOfferings();
		expect(queryResult.entities.length).toBe(1);

		expect(queryResult.entities[0].id).toBe(
			serviceOfferingCedential.credential.credentialSubject.id
		);
	});

	test("It should register a compliant Data Space Connector", async () => {
		const fedCatalogueService = new FederatedCatalogueService(options);
		// The Participant first must exist
		await fedCatalogueService.registerComplianceCredential(participantCredential.jwtCredential);

		await fedCatalogueService.registerDataSpaceConnectorCredential(
			dataSpaceConnectorCredential.jwtCredential
		);
		const queryResult = await fedCatalogueService.queryDataSpaceConnectors();
		expect(queryResult.entities.length).toBe(1);

		expect(queryResult.entities[0].id).toBe(
			dataSpaceConnectorCredential.credential.credentialSubject.id
		);
	});
});
