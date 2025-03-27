// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDataSpaceConnector } from "../data-space-connector/IDataSpaceConnector";
import type { IDataSpaceConnectorEntry } from "../data-space-connector/IDataSpaceConnectorEntry";

/**
 * Response for Data Space Connector list
 */
export interface IDataSpaceConnectorListResponse {
	/**
	 * The response payload.
	 */
	body: {
		/**
		 * The LD @context.
		 */
		"@context": IDataSpaceConnector["@context"];
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: Omit<IDataSpaceConnectorEntry, "@context">[];

		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	};
}
