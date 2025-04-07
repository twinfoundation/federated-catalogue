// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Get the a list of the participant entries.
 */
export interface IParticipantGetRequest {
	/**
	 * The parameters from the path.
	 */
	pathParams: {
		/**
		 * The id of Participant to get.
		 */
		id: string;
	};
}
