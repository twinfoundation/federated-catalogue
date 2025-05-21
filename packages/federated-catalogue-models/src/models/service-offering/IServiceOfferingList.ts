// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { SchemaOrgTypes } from "@twin.org/standards-schema-org";
import type { IServiceOfferingEntry } from "./IServiceOfferingEntry";
import type { FederatedCatalogueContextType } from "../federatedCatalogueContextType";

/**
 * Interface describing a list of Service Offering Entries.
 */
export interface IServiceOfferingList {
	/**
	 * The LD Context.
	 */
	"@context": FederatedCatalogueContextType;

	/**
	 * The type
	 */
	type: typeof SchemaOrgTypes.ItemList;

	/**
	 * The components of the Collection
	 *
	 */
	[SchemaOrgTypes.ItemListElement]: Omit<IServiceOfferingEntry, "@context">[];

	/**
	 * Next item cursor.
	 */
	[SchemaOrgTypes.NextItem]?: string;
}
