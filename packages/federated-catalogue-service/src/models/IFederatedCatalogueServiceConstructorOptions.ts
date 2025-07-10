// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IFederatedCatalogueServiceConfig } from "./IFederatedCatalogueServiceConfig";

/**
 * Federated Catalogue service options
 */
export interface IFederatedCatalogueServiceConstructorOptions {
	/**
	 * The identity resolver component used.
	 */
	identityResolverComponentType?: string;

	/**
	 * Logging connector type
	 */
	loggingConnectorType?: string;

	/**
	 * The configuration of the Federated Catalogue service.
	 */
	config: IFederatedCatalogueServiceConfig;

	/**
	 * The entity storage for participants.
	 * @default participant-entry
	 */
	participantEntityStorageType?: string;

	/**
	 * The entity storage for data resources.
	 * @default data-resource-entry
	 */
	dataResourceEntityStorageType?: string;

	/**
	 * The entity storage for service offerings.
	 * @default service-offering-entry
	 */
	serviceOfferingEntityStorageType?: string;

	/**
	 * The entity storage for data space connectors.
	 * @default data-space-connector-entry
	 */
	dataSpaceConnectorStorageType?: string;
}
