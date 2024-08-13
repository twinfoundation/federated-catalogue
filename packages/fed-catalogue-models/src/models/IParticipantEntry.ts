// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Interface describing a participant.
 */
export interface IParticipantEntry {
	/**
	 * The participant Id.
	 */
	participantId: string;

	/**
	 * The legal registration number.
	 */
	lrnType: string;

	/**
	 * The legal registration number.
	 */
	legalRegistrationNumber: string;

	/**
	 * The legal name.
	 */
	legalName: string;
}
