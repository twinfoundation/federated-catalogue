// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { GaiaXContexts } from "@twin.org/standards-gaia-x";
import type { SchemaOrgContexts } from "@twin.org/standards-schema-org";
import type { FederatedCatalogueContexts } from "./federatedCatalogueContexts";

/**
 * Type that defines the LD Context for the Federated Catalogue entities and entries.
 */
export type FederatedCatalogueContextType = [
	typeof SchemaOrgContexts.ContextRoot,
	typeof GaiaXContexts.ContextRoot,
	typeof FederatedCatalogueContexts.ContextRoot
];
