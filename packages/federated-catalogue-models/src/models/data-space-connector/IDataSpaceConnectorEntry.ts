// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { ICatalogueEntry } from "../ICatalogueEntry";
import type { IDataSpaceConnector } from "./IDataSpaceConnector";
import type { FederatedCatalogueContextType } from "../fedCatalogueEntryContextType";

/**
 * Interface describing a participant.
 */
export interface IDataSpaceConnectorEntry extends IDataSpaceConnector, ICatalogueEntry {
	/**
	 * The LD Context
	 */
	"@context": FederatedCatalogueContextType;

	/**
	 * Offered resources. Probably in the future this wll be separated in a different entry so
	 * that a  Data Space Connector entry does not need to be modified when a new Data Resource
	 * is offered.
	 */
	offeredResource: string[];
}
