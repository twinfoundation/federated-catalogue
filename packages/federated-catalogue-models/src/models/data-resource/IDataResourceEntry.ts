// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { GaiaXContexts, IDataResource } from "@twin.org/standards-gaia-x";
import type { SchemaOrgContexts } from "@twin.org/standards-schema-org";
import type { DidContexts } from "@twin.org/standards-w3c-did";
import type { ICatalogueEntry } from "../ICatalogueEntry";

/**
 * Interface describing a Data Resource entry.
 */
export interface IDataResourceEntry extends ICatalogueEntry, IDataResource {
	/**
	 * The LD Context
	 */
	"@context": [
		typeof GaiaXContexts.GaiaXLdContext,
		typeof SchemaOrgContexts.ContextRoot,
		typeof DidContexts.ContextVCv2
	];

	/**
	 * Overwriting producedBy as we only store the identifier
	 */
	producedBy: string;

	/**
	 * Overwriting copyrightOwnedBy as we only store the identifier
	 */
	copyrightOwnedBy: string;

	/**
	 * Overwriting exposedThrough as we only store the id of the Data Exchange Component
	 */
	exposedThrough: string;
}
