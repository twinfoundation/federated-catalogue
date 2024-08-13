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
	@property({ type: "string", isPrimary: true, optional: true })
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
}
