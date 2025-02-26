// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IJsonLdKeyword } from "@twin.org/data-json-ld";
import type { DidContexts, DidTypes, IDidVerifiableCredential } from "@twin.org/standards-w3c-did";
import type { FederatedCatalogueTypes } from "./federatedCatalogueTypes";
import type { IComplianceEvidence } from "./IComplianceEvidence";
import type { GaiaXContexts } from "../gaia-x/gaiaxContexts";

/**
 * A Compliance credential.
 */
export interface IComplianceCredential extends IDidVerifiableCredential {
	/**
	 * The LD Context.
	 */
	"@context": [
		typeof DidContexts.ContextVCv2,
		typeof GaiaXContexts.Gaia_X_LD_Context,
		typeof GaiaXContexts.W3Id_Security_JWS_LD_Context,
		...IJsonLdKeyword["@type"][]
	];
	/**
	 * The Id of the credential, it is mandatory.
	 */
	id: string;

	/**
	 * Type of Credential.
	 */
	type: [typeof DidTypes.VerifiableCredential, typeof FederatedCatalogueTypes.ComplianceCredential];

	/**
	 * Compliance evidence. It is mandatory.
	 *
	 */
	evidence: IComplianceEvidence[];
}
