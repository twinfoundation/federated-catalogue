// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IServiceOffering } from "@twin.org/standards-gaia-x";
import type { IOdrlPolicy } from "@twin.org/standards-w3c-odrl";
import type { FederatedCatalogueContextType } from "../federatedCatalogueContextType";
import type { ICatalogueBase } from "../ICatalogueBase";

/**
 * Interface describing a Service Offering.
 */
export interface IServiceOfferingEntry extends ICatalogueBase, IServiceOffering {
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

	/**
	 * The service policy is always stored as an array
	 */
	servicePolicy: IOdrlPolicy[];
}
