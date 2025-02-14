// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, property } from "@twin.org/entity";

/**
 * Service Description Entry.
 */
@entity()
export class DataResourceEntry {
	/**
	 * The Id.
	 */
	@property({ type: "string", isPrimary: true })
	public id!: string;

	/**
	 * The name.
	 */
	@property({ type: "string" })
	public name!: string;

	/**
	 * The description.
	 */
	@property({ type: "string", optional: true })
	public description?: string;

	/**
	 * The producer of the data
	 */
	@property({ type: "string" })
	public producedBy!: string;

	/**
	 * The copyright owner
	 */
	@property({ type: "string" })
	public copyrightOwnedBy!: string;

	/**
	 * The license
	 */
	@property({ type: "string" })
	public license!: string;

	/**
	 * The REST endpoint
	 */
	@property({ type: "string", optional: true })
	public exposedThrough!: string;

	/**
	 * The policy
	 */
	@property({ type: "object" })
	public resourcePolicy!: unknown;

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
	 * Evidences
	 */
	@property({ type: "array" })
	public evidences!: string[];
}
