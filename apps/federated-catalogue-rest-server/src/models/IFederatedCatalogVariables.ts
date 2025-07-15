// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineEnvironmentVariables, IEngineServerEnvironmentVariables } from "@twin.org/node-core";

/**
 * The environment variables for the federated catalogue node.
 */
export interface IFederatedCatalogVariables
	extends IEngineEnvironmentVariables,
		IEngineServerEnvironmentVariables {
	/**
	 * The DIDs of the Clearing Houses that can approve
	 */
	clearingHouseApproverList: string;

	/**
	 * Sub-resource cache TTL in milliseconds
	 */
	subResourceCacheTtlMs: string | undefined;
}
