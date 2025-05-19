// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDataResource } from "@twin.org/standards-gaia-x";
import type { IOdrlPolicy } from "@twin.org/standards-w3c-odrl";
import type { FederatedCatalogueContextType } from "../fedCatalogueContextType";
import type { ICatalogueEntry } from "../ICatalogueEntry";

/**
 * Interface describing a Data Resource entry.
 */
export interface IDataResourceEntry extends ICatalogueEntry, IDataResource {
	/**
	 * The LD Context
	 */
	"@context": FederatedCatalogueContextType;

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

	/**
	 * Overwriting to ensure always an array is stored
	 */
	resourcePolicy: IOdrlPolicy[];
}
