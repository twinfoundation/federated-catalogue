// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IJsonLdNodeObject } from "@twin.org/data-json-ld";
import type { FederatedCatalogueTypes } from "./federatedCatalogueTypes";

/**
 * Compliance Evidence.
 */
export interface IComplianceEvidence extends IJsonLdNodeObject {
	/**
	 * Resolvable Id that allows to get access to the credential that serves as evidence.
	 */
	id: string;

	/**
	 * Type of evidence.
	 */
	type: typeof FederatedCatalogueTypes.CompliantCredential;

	/**
	 * One or more cryptographic digests, as defined by the hash-expression
	 * ABNF grammar defined in the Sub-resource Integrity specification,
	 * Section 3.5: The integrity attribute.
	 */
	digestSRI: string;

	/**
	 * Original type
	 *
	 */
	credentialType: string | string[];
}
