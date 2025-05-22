// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDataSpaceConnectorEntry } from "../data-space-connector/IDataSpaceConnectorEntry";

/**
 * Service Offering response
 */
export interface IDataSpaceConnectorGetResponse {
	/**
	 * The response payload.
	 */
	body: IDataSpaceConnectorEntry;
}
