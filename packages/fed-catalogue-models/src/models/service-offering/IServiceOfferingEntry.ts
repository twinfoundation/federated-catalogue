// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IServiceOffering } from "@twin.org/standards-gaia-x";
import type { ICatalogEntry } from "../ICatalogEntry";

/**
 * Interface describing a SD.
 */
export interface IServiceOfferingEntry extends ICatalogEntry, IServiceOffering {
	/**
	 * Overwrites providedBy as we only store identifier as string
	 */
	providedBy: string;

	/**
	 * Overwrites aggregationOfResources as we only store identifier as string
	 */
	aggregationOfResources: string[];
}
