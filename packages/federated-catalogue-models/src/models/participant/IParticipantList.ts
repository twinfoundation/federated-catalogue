// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { SchemaOrgTypes } from "@twin.org/standards-schema-org";
import type { IParticipantEntry } from "./IParticipantEntry";
import type { FederatedCatalogueContextType } from "../federatedCatalogueContextType";

/**
 * Interface describing a participant entry list.
 */
export interface IParticipantList {
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
	[SchemaOrgTypes.ItemListElement]: Omit<IParticipantEntry, "@context">[];

	/**
	 * Next item cursor.
	 */
	[SchemaOrgTypes.NextItem]?: string;
}
