// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { GaiaXContexts } from "@twin.org/standards-gaia-x";
import type { SchemaOrgContexts, SchemaOrgTypes } from "@twin.org/standards-schema-org";
import type { DidContexts } from "@twin.org/standards-w3c-did";
import type { IDataResourceEntry } from "./IDataResourceEntry";

/**
 * Interface describing a list of Data Resource entries.
 */
export interface IDataResourceList {
	/**
	 * The LD Context.
	 */
	"@context": [
		typeof SchemaOrgContexts.ContextRoot,
		typeof DidContexts.ContextVCv2,
		typeof GaiaXContexts.GaiaXLdContext
	];

	/**
	 * The type
	 */
	type: typeof SchemaOrgTypes.StructuredValue;

	/**
	 * The components of the Collection
	 *
	 */
	itemListElement: Omit<IDataResourceEntry, "@context">[];

	/**
	 * Next item cursor.
	 */
	nextItem?: string;
}
