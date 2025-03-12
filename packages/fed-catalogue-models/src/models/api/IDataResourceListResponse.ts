// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDataResource } from "../../gaia-x/IDataResource";
import type { IDataResourceEntry } from "../data-resource/IDataResourceEntry";

/**
 * Response fo data resource list.
 */
export interface IDataResourceListResponse {
	/**
	 * The response payload.
	 */
	body: {
		/**
		 * The LD @context.
		 */
		"@context": IDataResource["@context"];
		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: Omit<IDataResourceEntry, "@context">[];

		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	};
}
