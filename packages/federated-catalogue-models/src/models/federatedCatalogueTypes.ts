// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The types concerning the Federated Catalogue.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const FederatedCatalogueTypes = {
	/**
	 * A Credential that is compliant.
	 */
	CompliantCredential: "CompliantCredential",

	/**
	 * A Compliance Credential.
	 */
	ComplianceCredential: "ComplianceCredential",

	/**
	 * A Data Space Connector.
	 */
	DataSpaceConnector: "DataSpaceConnector"
} as const;

/**
 * The Exported types
 */
export type FederatedCatalogueTypes =
	(typeof FederatedCatalogueTypes)[keyof typeof FederatedCatalogueTypes];
