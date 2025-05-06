// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { GaiaXContexts } from "@twin.org/standards-gaia-x";
import type { SchemaOrgContexts } from "@twin.org/standards-schema-org";
import type { DidContexts } from "@twin.org/standards-w3c-did";
import type { ICatalogueEntry } from "../ICatalogueEntry";
import type { IDataSpaceConnector } from "./IDataSpaceConnector";
import type { FederatedCatalogueContexts } from "../federatedCatalogueContexts";

/**
 * Interface describing a participant.
 */
export interface IDataSpaceConnectorEntry extends IDataSpaceConnector, ICatalogueEntry {
	/**
	 * The LD Context
	 */
	"@context": [
		typeof GaiaXContexts.GaiaXLdContext,
		typeof SchemaOrgContexts.ContextRoot,
		typeof DidContexts.ContextVCv2,
		typeof FederatedCatalogueContexts.ContextRoot
	];

	/**
	 * Offered resources. Probably in the future this wll be separated in a different entry so
	 * that a  Data Space Connector entry does not need to be modified when a new Data Resource
	 * is offered.
	 */
	offeredResource: string[];
}
