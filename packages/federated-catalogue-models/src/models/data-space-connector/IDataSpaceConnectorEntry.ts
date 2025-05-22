// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { ICatalogueBase } from "../ICatalogueBase";
import type { IDataSpaceConnector } from "./IDataSpaceConnector";
import type { FederatedCatalogueContextType } from "../federatedCatalogueContextType";

/**
 * Interface describing a participant.
 */
export interface IDataSpaceConnectorEntry extends IDataSpaceConnector, ICatalogueBase {
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
