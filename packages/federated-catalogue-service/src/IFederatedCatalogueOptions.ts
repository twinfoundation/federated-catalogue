// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Federated Catalogue service options
 */
export interface IFederatedCatalogueOptions {
	/**
	 * The number of ms that sub-resources can live in the fetch cache.
	 * 0 means they can live forever.
	 * undefined means they are never cached.
	 */
	subResourceCacheTtlMs?: number;
	/**
	 * Logging connector type
	 */
	loggingConnectorType?: string;

	/**
	 * Clearing House approver list
	 */
	clearingHouseApproverList: string[];
}
