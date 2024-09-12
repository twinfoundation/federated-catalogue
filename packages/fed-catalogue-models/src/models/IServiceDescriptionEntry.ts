// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Interface describing a SD.
 */
export interface IServiceDescriptionEntry {
	/**
	 * Service Id.
	 */
	serviceId: string;

	/**
	 * Service provider
	 */
	providedBy: string;

	/**
	 * REST endpoint
	 */
	restEndpoint: string;

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
}
