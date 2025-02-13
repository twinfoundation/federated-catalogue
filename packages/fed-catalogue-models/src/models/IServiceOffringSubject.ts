// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Service Offering Subject. See Gaia-X Ontology.
 */
export interface IServiceOfferingSubject {
		id: string;
		type: "ServiceOffering";
		description?: string;
		name: string;
		providedBy: string;
		servicePolicy: unknown;
		aggregationOfResources?: string[];
}