// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IParticipant } from "../../gaia-x/IParticipant";
import type { IParticipantEntry } from "../participant/IParticipantEntry";

/**
 * Response for log entry list request.
 */
export interface IParticipantListResponse {
	/**
	 * The response payload.
	 */
	body: {
		/**
		 * The LD @context.
		 */
		"@context": IParticipant["@context"];

		/**
		 * The entities, which can be partial if a limited keys list was provided.
		 */
		entities: Omit<IParticipantEntry, "@context">[];

		/**
		 * An optional cursor, when defined can be used to call find to get more entities.
		 */
		cursor?: string;
	};
}
