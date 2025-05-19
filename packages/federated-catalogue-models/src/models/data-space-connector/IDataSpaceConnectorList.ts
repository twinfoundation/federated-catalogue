// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { SchemaOrgTypes } from "@twin.org/standards-schema-org";
import type { IDataSpaceConnectorEntry } from "./IDataSpaceConnectorEntry";
import type { FederatedCatalogueContextType } from "../fedCatalogueContextType";

/**
 * Interface describing a list of Data Space Connectors.
 */
export interface IDataSpaceConnectorList {
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
	[SchemaOrgTypes.ItemListElement]: Omit<IDataSpaceConnectorEntry, "@context">[];

	/**
	 * Next item cursor.
	 */
	[SchemaOrgTypes.NextItem]?: string;
}
