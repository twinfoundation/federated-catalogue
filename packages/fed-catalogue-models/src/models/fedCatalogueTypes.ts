// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The types of Federated Catalog Data
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const FederatedCatalogueTypes = {
	/**
	 * The Gaia-X LD Context
	 */
	Gaia_X_LD_Context: "https://w3id.org/gaia-x/development#",

  /**
   * The W3id security LD Context
   */
  W3Id_Security_JWS_Context: "https://w3id.org/security/suites/jws-2020/v1"
} as const;
