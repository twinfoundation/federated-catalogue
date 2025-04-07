// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IServiceOfferingEntry } from "../service-offering/IServiceOfferingEntry";

/**
 * Service Offering response
 */
export interface IServiceOfferingGetResponse {
	/**
	 * The response payload.
	 */
	body: IServiceOfferingEntry;
}
