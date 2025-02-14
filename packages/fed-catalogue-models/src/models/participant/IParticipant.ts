// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

export interface IParticipant {
	/**
	 * The participant Id.
	 */
	id: string;

	/**
	 * JSON-LD type.
	 */
	type: "Participant";

	/**
	 * The legal registration number type.
	 */
	lrnType: string;

	/**
	 * The legal registration number.
	 */
	registrationNumber: string;

	/**
	 * The legal name.
	 */
	legalName: string;

	/**
	 * Country code
	 */
	countryCode: string;
}
