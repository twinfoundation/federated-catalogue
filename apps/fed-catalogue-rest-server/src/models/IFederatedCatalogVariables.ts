// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEngineEnvironmentVariables } from "@twin.org/engine";
import type { IEngineServerEnvironmentVariables } from "@twin.org/engine-server";

/**
 * The environment variables for the workbench node.
 */
export interface IFederatedCatalogVariables
	extends IEngineEnvironmentVariables,
		IEngineServerEnvironmentVariables {
	/**
	 * The DIF universal resolver endpoint.
	 */
	resolverEndpoint: string;

	/**
	 * The DIDs of the Clearing Houses that are whitelisted
	 */
	clearingHouseWhitelist: string[];
}
