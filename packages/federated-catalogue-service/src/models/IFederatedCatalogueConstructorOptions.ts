// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IFederatedCatalogueConfig } from "./IFederatedCatalogueConfig";

/**
 * Federated Catalogue service options
 */
export interface IFederatedCatalogueConstructorOptions {
	/**
	 * The identity resolver component used.
	 */
	identityResolverComponentType?: string;

	/**
	 * Logging connector type
	 */
	loggingConnectorType?: string;

	/**
	 * The configuration of the Federated Catalogue service.
	 */
	config: IFederatedCatalogueConfig;
}
