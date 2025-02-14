// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { IAddress } from "./IAddress";
import { IRegistrationNumber } from "./IRegistrationNumber";

/**
 * A Legal Person participating in the ecosystem
 */
export interface IParticipant {
	/**
	 * The participant Id.
	 */
	id: string;

	/**
	 * JSON-LD type.
	 */
	type: "LegalPerson";

	/**
	 * The legal registration number.
	 */
	registrationNumber: IRegistrationNumber;

	/**
	 * The legal name.
	 */
	legalName: string;

	/**
	 *  Legal Address
	 *
	 */
	legalAddress: IAddress;
}
