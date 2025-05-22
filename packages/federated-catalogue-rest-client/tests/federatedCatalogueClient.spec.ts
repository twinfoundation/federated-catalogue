// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { FederatedCatalogueClient } from "../src/federatedCatalogueClient";

describe("FederatedCatalogueClient", () => {
	test("Can create an instance", async () => {
		const client = new FederatedCatalogueClient({ endpoint: "http://localhost:8080" });
		expect(client).toBeDefined();
	});
});
