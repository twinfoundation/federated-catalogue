// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IServiceOffering } from "@twin.org/standards-gaia-x";
import type { FederatedCatalogueContextType } from "../fedCatalogueContextType";
import type { ICatalogueEntry } from "../ICatalogueEntry";

/**
 * Interface describing a Service Offering.
 */
export interface IServiceOfferingEntry extends ICatalogueEntry, IServiceOffering {
	/**
	 * The LD Context
	 */
	"@context": FederatedCatalogueContextType;
	/**
	 * Overwrites providedBy as we only store identifier as string
	 */
	providedBy: string;

	/**
	 * Overwrites aggregationOfResources as we only store identifier as string
	 */
	aggregationOfResources?: string[];
}
