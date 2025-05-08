// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IServiceOfferingList } from "../service-offering/IServiceOfferingList";

/**
 * Response for Service Offering list
 */
export interface IServiceOfferingListResponse {
	/**
	 * The response payload.
	 */
	body: IServiceOfferingList;
}
