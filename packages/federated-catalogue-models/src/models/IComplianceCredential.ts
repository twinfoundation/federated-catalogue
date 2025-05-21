// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IJsonLdKeyword } from "@twin.org/data-json-ld";
import type { GaiaXContexts } from "@twin.org/standards-gaia-x";
import type { DidContexts, DidTypes } from "@twin.org/standards-w3c-did";
import type { FederatedCatalogueTypes } from "./federatedCatalogueTypes";
import type { IComplianceEvidence } from "./IComplianceEvidence";
import type { ICredential } from "./ICredential";

/**
 * A Compliance credential.
 */
export interface IComplianceCredential extends ICredential {
	/**
	 * The LD Context.
	 */
	"@context": [
		typeof DidContexts.ContextVCv2,
		typeof GaiaXContexts.GaiaXLdContext,
		typeof GaiaXContexts.W3IdSecurityJwsLdContext,
		...IJsonLdKeyword["@type"][]
	];

	/**
	 * Type of Credential.
	 */
	type: [typeof DidTypes.VerifiableCredential, typeof FederatedCatalogueTypes.ComplianceCredential];

	/**
	 * A compliance credential requires a validity period
	 */
	validFrom: string;

	/**
	 * A compliance credential requires a validity period
	 */
	validUntil: string;

	/**
	 * Compliance evidence. It is mandatory.
	 *
	 */
	evidence: IComplianceEvidence[];
}
