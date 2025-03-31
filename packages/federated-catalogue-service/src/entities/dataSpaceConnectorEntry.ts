// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, property, SortDirection } from "@twin.org/entity";
import type { IEndpoint } from "@twin.org/standards-gaia-x";

/**
 * Data Space Connector Entry.
 */
@entity()
export class DataSpaceConnectorEntry {
	/**
	 * The Id.
	 */
	@property({ type: "string", isPrimary: true })
	public id!: string;

	/**
	 * The trusted issuer of the compliance credential.
	 */
	@property({ type: "string" })
	public trustedIssuerId!: string;

	/**
	 * The name.
	 */
	@property({ type: "string", optional: true })
	public name?: string;

	/**
	 * The description.
	 */
	@property({ type: "string", optional: true })
	public description?: string;

	/**
	 * The identity of the Data Space Connector
	 */
	@property({ type: "string" })
	public identity!: string;

	/**
	 * Who maintains the Data Space Connector
	 */
	@property({ type: "string", isSecondary: true })
	public maintainer!: string;

	/**
	 * The default endpoint
	 */
	@property({ type: "object" })
	public defaultEndpoint!: IEndpoint;

	/**
	 * The activity push endpoint
	 */
	@property({ type: "object" })
	public pushActivityEndpoint!: IEndpoint;

	/**
	 * The activity subscribe endpoint
	 */
	@property({ type: "object", optional: true })
	public subscriptionActivityEndpoint?: IEndpoint;

	/**
	 * The pull data endpoint
	 */
	@property({ type: "object" })
	public pullDataEndpoint!: IEndpoint;

	/**
	 * The pull data endpoint
	 */
	@property({ type: "array" })
	public offeredResource!: string[];

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
