// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDataResource } from "@twin.org/standards-gaia-x";
import type { ICatalogEntry } from "../ICatalogEntry";

/**
 * Interface describing a Data Resource entry.
 */
export interface IDataResourceEntry extends ICatalogEntry, IDataResource {
	/**
	 * Overwriting producedBy as we only store the identifier
	 */
	producedBy: string;

	/**
	 * Overwriting exposedThrough as we only store the id of the Data Exchange Component
	 */
	exposedThrough: string;
}
