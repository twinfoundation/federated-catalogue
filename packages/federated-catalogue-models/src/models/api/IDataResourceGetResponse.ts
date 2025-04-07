// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDataResourceEntry } from "../data-resource/IDataResourceEntry";

/**
 * Service Offering response
 */
export interface IDataResourceGetResponse {
	/**
	 * The response payload.
	 */
	body: IDataResourceEntry;
}
