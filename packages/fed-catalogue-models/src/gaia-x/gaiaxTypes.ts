// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/* eslint-disable camelcase */

/**
 * The types concerning Gaia-X
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const GaiaXTypes = {
	/**
	 * Data Resource
	 */
	DataResource: "DataResource",

	/**
	 * Service Offering Type
	 */
	ServiceOffering: "ServiceOffering",

	/**
	 * Participant
	 */
	Participant: "LegalPerson",

	/**
	 * Data Exchange Component
	 */
	DataExchangeComponent: "DataExchangeComponent",

	/**
	 * Address
	 */
	Address: "Address",

	/**
	 * Endpoint
	 */
	Endpoint: "Endpoint",

	/**
	 * Registration number
	 */
	Registration_Number: "RegistrationNumber"
} as const;
