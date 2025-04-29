// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDataResourceList } from "../data-resource/IDataResourceList";

/**
 * Response fo data resource list.
 */
export interface IDataResourceListResponse {
	/**
	 * The response payload.
	 */
	body: {
		/**
		 * The list of Data Resources.
		 */
		entities: IDataResourceList;
		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	};
}
