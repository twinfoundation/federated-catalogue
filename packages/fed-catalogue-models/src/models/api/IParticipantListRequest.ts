// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Get the a list of the participant entries.
 */
export interface IParticipantListRequest {
	/**
	 * The query parameters.
	 */
	query: {
		/**
		 * The participant Id.
		 */
		id?: string;

		/**
		 * The legal registration number.
		 */
		registrationNumber?: string;

		/**
		 * The legal registration number type.
		 */
		lrnType?: string;

		/**
		 * The optional cursor to get next chunk.
		 */
		cursor?: string;

		/**
		 * The maximum number of entities in a page.
		 */
		pageSize?: number;
	};
}
