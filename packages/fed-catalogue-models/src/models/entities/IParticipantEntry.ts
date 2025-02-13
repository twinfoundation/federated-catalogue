// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { IParticipant } from "../IParticipant";

/**
 * Interface describing a participant.
 */
export interface IParticipantEntry extends IParticipant {
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
	 * The trusted issuer of the compliance credential
	 */
	trustedIssuerId: string;

	/**
	 * Country code
	 */
	countryCode: string;

	/**
	 * Date created
	 */
	dateCreated: string;

	/**
	 * Original credentials
	 *
	 */
	evidences: string[];
}
