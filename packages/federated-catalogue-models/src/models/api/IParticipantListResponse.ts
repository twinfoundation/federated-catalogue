// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IParticipantList } from "../participant/IParticipantList";

/**
 * Response for participant list query
 */
export interface IParticipantListResponse {
	/**
	 * The response payload.
	 */
	body: IParticipantList;
}
