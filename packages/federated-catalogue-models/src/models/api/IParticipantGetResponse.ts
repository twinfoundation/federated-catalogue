// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IParticipantEntry } from "../participant/IParticipantEntry";

/**
 * Response for participant list query
 */
export interface IParticipantGetResponse {
	/**
	 * The response payload.
	 */
	body: IParticipantEntry;
}
