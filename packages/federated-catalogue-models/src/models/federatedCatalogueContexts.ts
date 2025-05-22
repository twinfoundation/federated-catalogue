// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The LD context concerning the Federated Catalogue.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const FederatedCatalogueContexts = {
	/**
	 * A Credential that is compliant.
	 */
	ContextRoot: "https://schema.twindev.org/federated-catalogue/types.jsonld"
} as const;

/**
 * The Exported types
 */
export type FederatedCatalogueContexts =
	(typeof FederatedCatalogueContexts)[keyof typeof FederatedCatalogueContexts];
