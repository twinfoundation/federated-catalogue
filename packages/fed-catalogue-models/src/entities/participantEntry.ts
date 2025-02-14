// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, property, SortDirection } from "@twin.org/entity";
import { IRegistrationNumber } from "../gaia-x/IRegistrationNumber";

/**
 * Participant entry.
 */
@entity()
export class ParticipantEntry {
	/**
	 * The participant Id.
	 */
	@property({ type: "string", isPrimary: true })
	public id!: string;

	/**
	 * The legal registration number.
	 */
	@property({ type: "object" })
	public registrationNumber!: IRegistrationNumber;

	/**
	 * The legal name.
	 */
	@property({ type: "string" })
	public legalName!: string;

	/**
	 * The trusted issuer of the compliance credential
	 */
	@property({ type: "string" })
	public trustedIssuerId!: string;

	/**
	 * Country code
	 */
	@property({ type: "string" })
	public countryCode!: string;

	/**
	 * Valid from
	 */
	@property({ type: "string", format: "date-time" })
	public validFrom!: string;

	/**
	 * Valid to
	 */
	@property({ type: "string", format: "date-time" })
	public validUntil!: string;

	/**
	 * Date created
	 */
	@property({ type: "string", format: "date-time", sortDirection: SortDirection.Descending })
	public dateCreated!: string;

	/**
	 * Date created
	 */
	@property({ type: "array" })
	public evidences!: string[];
}
