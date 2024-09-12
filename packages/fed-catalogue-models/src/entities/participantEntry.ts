// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, property } from "@gtsc/entity";

/**
 * Call defining a telemetry metric.
 */
@entity()
export class ParticipantEntry {
	/**
	 * The participant Id.
	 */
	@property({ type: "string", isPrimary: true })
	public participantId!: string;

	/**
	 * The legal registration number.
	 */
	@property({ type: "string", optional: true })
	public lrnType!: string;

	/**
	 * The legal registration number.
	 */
	@property({ type: "string" })
	public legalRegistrationNumber!: string;

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
	@property({ type: "string" })
	public validFrom!: string;

	/**
	 * Valid to
	 */
	@property({ type: "string" })
	public validUntil!: string;

	/**
	 * Date created
	 */
	@property({ type: "string" })
	public dateCreated!: string;

	/**
	 * Date created
	 */
	@property({ type: "array" })
	public evidences!: string[];
}
