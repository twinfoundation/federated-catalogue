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
	 * The DIDs of the Clearing Houses that can approve
	 */
	clearingHouseApproverList: string;
}
