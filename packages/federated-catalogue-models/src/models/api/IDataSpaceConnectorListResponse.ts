// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDataSpaceConnectorList } from "../data-space-connector/IDataSpaceConnectorList";

/**
 * Response for Data Space Connector list
 */
export interface IDataSpaceConnectorListResponse {
	/**
	 * The response payload.
	 */
	body: IDataSpaceConnectorList;
}
