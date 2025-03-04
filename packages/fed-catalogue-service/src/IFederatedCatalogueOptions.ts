// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Federated Catalogue service options
 */
export interface IFederatedCatalogueOptions {
	/**
	 * Logging connector type
	 */
	loggingConnectorType?: string;

	/**
	 * Resolver endpoint
	 */
	didResolverEndpoint: string;
}
