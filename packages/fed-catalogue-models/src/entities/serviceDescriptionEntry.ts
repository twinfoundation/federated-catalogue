// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, property } from "@gtsc/entity";

/**
 * Service Description Entry.
 */
@entity()
export class ServiceDescriptionEntry {
	/**
	 * The service Id.
	 */
	@property({ type: "string", isPrimary: true })
	public serviceId!: string;

	/**
	 * The service name.
	 */
	@property({ type: "string" })
	public name!: string;

	/**
	 * The service description.
	 */
	@property({ type: "string", optional: true })
	public description?: string;

	/**
	 * The provider
	 */
	@property({ type: "string" })
	public providedBy!: string;

	/**
	 * The REST endpoint
	 */
	@property({ type: "string", optional: true })
	public endpointURL!: string;

	/**
	 * The policy
	 */
	@property({ type: "object" })
	public servicePolicy!: unknown;

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
