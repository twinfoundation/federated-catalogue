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
	body: {
		/**
		 * The entities as a Participant list
		 */
		data: IParticipantList;

		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	};
}
