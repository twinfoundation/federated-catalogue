// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { GaiaXContexts, IServiceOffering } from "@twin.org/standards-gaia-x";
import type { SchemaOrgContexts } from "@twin.org/standards-schema-org";
import type { DidContexts } from "@twin.org/standards-w3c-did";
import type { ICatalogueEntry } from "../ICatalogueEntry";

/**
 * Interface describing a Service Offering.
 */
export interface IServiceOfferingEntry extends ICatalogueEntry, IServiceOffering {
	/**
	 * The LD Context
	 */
	"@context": [
		typeof GaiaXContexts.GaiaXLdContext,
		typeof SchemaOrgContexts.ContextRoot,
		typeof DidContexts.ContextVCv2
	];
	/**
	 * Overwrites providedBy as we only store identifier as string
	 */
	providedBy: string;

	/**
	 * Overwrites aggregationOfResources as we only store identifier as string
	 */
	aggregationOfResources?: string[];
}
