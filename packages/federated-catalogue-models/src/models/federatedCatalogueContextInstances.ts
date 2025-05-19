// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { GaiaXContexts } from "@twin.org/standards-gaia-x";
import { SchemaOrgContexts } from "@twin.org/standards-schema-org";
import type { FederatedCatalogueContextType } from "./fedCatalogueContextType";
import { FederatedCatalogueContexts } from "./federatedCatalogueContexts";

/**
 * The LD context instances concerning the Federated Catalogue.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export abstract class FederatedCatalogueContextInstances {
	/**
	 * The LD Context of a list of Catalogue entries.
	 */
	public static DEFAULT_LD_CONTEXT_ENTRY_LIST: FederatedCatalogueContextType = [
		SchemaOrgContexts.ContextRoot,
		GaiaXContexts.GaiaXLdContext,
		FederatedCatalogueContexts.ContextRoot
	];

	/**
	 * The LD Context of a Catalogue entry.
	 */
	public static DEFAULT_LD_CONTEXT_ENTRY: FederatedCatalogueContextType =
		this.DEFAULT_LD_CONTEXT_ENTRY_LIST;
}
