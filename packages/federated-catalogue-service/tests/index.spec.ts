// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import fs from "node:fs";
import path from "node:path";

import { ComponentFactory, StringHelper, Urn } from "@twin.org/core";
import { MemoryEntityStorageConnector } from "@twin.org/entity-storage-connector-memory";
import { EntityStorageConnectorFactory } from "@twin.org/entity-storage-models";
import {
	IdentityResolverConnectorFactory,
	type IIdentityResolverConnector
} from "@twin.org/identity-models";
import { IdentityResolverService } from "@twin.org/identity-service";
import { ModuleHelper } from "@twin.org/modules";
import { nameof } from "@twin.org/nameof";
import { addAllContextsToDocumentCache } from "@twin.org/standards-ld-contexts";

import type { IDidDocument } from "@twin.org/standards-w3c-did";
import { FederatedCatalogueService } from "../src/federatedCatalogueService";
import type { IFederatedCatalogueConstructorOptions } from "../src/models/IFederatedCatalogueConstructorOptions";
import { initSchema } from "../src/schema";

import dataResourceCredential from "./dataset/credentials/compliance/data-resource-credential.json" assert { type: "json" };
import dataSpaceConnectorCredential from "./dataset/credentials/compliance/data-space-connector-credential.json" assert { type: "json" };
import participantCredential from "./dataset/credentials/compliance/participant-credential.json" assert { type: "json" };
import serviceOfferingCedential from "./dataset/credentials/compliance/service-offering-credential.json" assert { type: "json" };

let participantStore: MemoryEntityStorageConnector<ParticipantEntry>;
let dataResourceStore: MemoryEntityStorageConnector<DataResourceEntry>;
let serviceOfferingStore: MemoryEntityStorageConnector<ServiceOfferingEntry>;
let dataSpaceConnectorStore: MemoryEntityStorageConnector<DataSpaceConnectorEntry>;

import { cleanupTestEnv, setupTestEnv } from "./setupTestEnv";
import type { ParticipantEntry } from "../src/entities/participantEntry";
// eslint-disable-next-line import/order
import type { DataResourceEntry } from "../src/entities/dataResourceEntry";
// eslint-disable-next-line import/order
import type { ServiceOfferingEntry } from "../src/entities/serviceOfferingEntry";
// eslint-disable-next-line import/order
import type { DataSpaceConnectorEntry } from "../src/entities/dataSpaceConnectorEntry";

let options: IFederatedCatalogueConstructorOptions;
/**
 * Extracts the URL as string.
 * @param request The request.
 * @returns URL as string.
 */
function extractURL(request: Request | URL | string): string {
	let url: string = "";
	if (request instanceof Request) {
		url = request.url;
	} else {
		url = typeof request === "string" ? request : request.toString();
	}
	return url;
}
describe("federated-catalogue-service", () => {
	beforeAll(async () => {
		const clearingHouseApproverList = await setupTestEnv();

		// Mock the module helper to execute the method in the same thread, so we don't have to create an engine
		ModuleHelper.execModuleMethodThread = vi
			.fn()
			.mockImplementation(async (module, method, args) =>
				ModuleHelper.execModuleMethod(module, method, args)
			);

		addAllContextsToDocumentCache();

		globalThis.fetch = vi
			.fn()
			.mockImplementation(
				async (request: Request | URL | string, opts: RequestInit | undefined) => {
					const url = new URL(extractURL(request));
					console.log(url);

					const filePath = url.pathname;
					const domainName = url.host;
					const pathToFile = path.join(__dirname, "published-datasets", domainName, filePath);
					const contentBuffer = await fs.readFileSync(pathToFile);
					const content = contentBuffer.toString();
					return {
						status: 200,
						ok: true,
						headers: { "Content-Type": "application/json", "Content-Length": content.length },
						json: async () => new Promise(resolve => resolve(JSON.parse(content)))
					};
				}
			);

		initSchema();

		ComponentFactory.register("identity-resolver", () => new IdentityResolverService());
		IdentityResolverConnectorFactory.register(
			"universal",
			() =>
				({
					resolveDocument: async (did: string): Promise<IDidDocument> => {
						const didUrn = Urn.fromValidString(did);
						const didId = didUrn.parts().pop() as string;

						const contentBuffer = await fs.readFileSync(
							path.join(__dirname, "dataset", "dids", didId)
						);
						const content = contentBuffer.toString();
						return JSON.parse(content) as IDidDocument;
					}
				}) as IIdentityResolverConnector
		);

		options = {
			loggingConnectorType: "console",
			// Check for support of multiple values from env vars
			config: { clearingHouseApproverList }
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

		expect(queryResult.data.hasPart.id).toBe(participantCredential.credential.credentialSubject.id);
	});

	test("It should register a compliant Data Resource", async () => {
		const fedCatalogueService = new FederatedCatalogueService(options);
		// The Participant first must exist
		await fedCatalogueService.registerComplianceCredential(participantCredential.jwtCredential);

		await fedCatalogueService.registerDataResourceCredential(dataResourceCredential.jwtCredential);
		const queryResult = await fedCatalogueService.queryDataResources();
		console.log(queryResult);
		expect(queryResult.data.hasPart.length).toBe(1);

		expect(queryResult.data.hasPart[0].id).toBe(
			dataResourceCredential.credential.credentialSubject.id
		);
	});

	test("It should register a compliant Service Offering", async () => {
		const fedCatalogueService = new FederatedCatalogueService(options);
		// The Participant first must exist
		await fedCatalogueService.registerComplianceCredential(participantCredential.jwtCredential);

		await fedCatalogueService.registerServiceOfferingCredential(
			serviceOfferingCedential.jwtCredential
		);
		const queryResult = await fedCatalogueService.queryServiceOfferings();
		expect(queryResult.data.hasPart.length).toBe(1);

		expect(queryResult.data.hasPart[0].id).toBe(
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
		expect(queryResult.data.hasPart.length).toBe(1);

		expect(queryResult.data.hasPart[0].id).toBe(
			dataSpaceConnectorCredential.credential.credentialSubject.id
		);
	});
});
