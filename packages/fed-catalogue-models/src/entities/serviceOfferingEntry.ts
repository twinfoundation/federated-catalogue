// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, property, SortDirection } from "@twin.org/entity";
import { IEndpoint } from "../gaia-x/IEndpoint";

/**
 * Service Description Entry.
 */
@entity()
export class ServiceDescriptionEntry {
	/**
	 * The service Id.
	 */
	@property({ type: "string", isPrimary: true })
	public id!: string;

	/**
	 * The trusted issuer of the compliance credential
	 */
	@property({ type: "string" })
	public trustedIssuer!: string;

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
	@property({ type: "object" })
	public servicePolicy!: unknown;

	/**
	 * Resources aggregated
	 */
	@property({ type: "array" })
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
	public evidences!: string[];
}
