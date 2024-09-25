// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Interface describing a SD.
 */
export interface IServiceDescriptionEntry {
	/**
	 * Service Id.
	 */
	id: string;

	/**
	 * Service offering.
	 */
	type: "ServiceOffering";

	/**
	 * Service policy.
	 */
	servicePolicy: unknown;

	/**
	 * Service name.
	 */
	name: string;

	/**
	 * Service description.
	 */
	description?: string;

	/**
	 * Service provider
	 */
	providedBy: string;

	/**
	 * REST endpoint
	 */
	endpointURL: string;

	/**
	 * Valid from
	 */
	validFrom: string;

	/**
	 * Valid to
	 */
	validUntil: string;

	/**
	 * Date created
	 */
	dateCreated: string;

	/**
	 * Original credentials
	 *
	 */
	evidences: string[];

	/**
	 *
	 * Resources aggregated
	 * */
	aggregationOfResources?: string[];
}
