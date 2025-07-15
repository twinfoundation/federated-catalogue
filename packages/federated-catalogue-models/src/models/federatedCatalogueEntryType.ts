// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { GaiaXTypes } from "@twin.org/standards-gaia-x";
import type { FederatedCatalogueTypes } from "./federatedCatalogueTypes";

/**
 * Types of entries in the Federated Catalogue
 *
 */
export type FederatedCatalogueEntryType =
	| typeof GaiaXTypes.LegalPerson
	| typeof GaiaXTypes.DataExchangeComponent
	| typeof GaiaXTypes.DataResource
	| typeof GaiaXTypes.ServiceOffering
	| typeof FederatedCatalogueTypes.DataSpaceConnector;
