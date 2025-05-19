// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, property, SortDirection } from "@twin.org/entity";
import type { IEndpoint } from "@twin.org/standards-gaia-x";
import type { IOdrlPolicy } from "@twin.org/standards-w3c-odrl";

/**
 * Service Offering Entry.
 */
@entity()
export class ServiceOfferingEntry {
	/**
	 * The service Id.
	 */
	@property({ type: "string", isPrimary: true })
	public id!: string;

	/**
	 * The trusted issuer of the compliance credential associated with
	 */
	@property({ type: "string" })
	public issuer!: string;

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
	 * The provider Id
	 */
	@property({ type: "string", isSecondary: true })
	public providedBy!: string;

	/**
	 * The REST endpoint
	 */
	@property({ type: "object" })
	public endpoint!: IEndpoint;

	/**
	 * The policy
	 */
	@property({ type: "array" })
	public servicePolicy!: IOdrlPolicy[];

	/**
	 * Resources aggregated
	 */
	@property({ type: "array", optional: true })
	public aggregationOfResources?: string[];

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
	 * Evidences
	 */
	@property({ type: "array" })
	public evidence!: string[];
}
