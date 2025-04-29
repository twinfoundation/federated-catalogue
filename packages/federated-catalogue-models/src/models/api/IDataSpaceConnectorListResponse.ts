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
	body: {
		/**
		 * The entities as a Data Space Connector list
		 */
		entities: IDataSpaceConnectorList;
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	};
}
