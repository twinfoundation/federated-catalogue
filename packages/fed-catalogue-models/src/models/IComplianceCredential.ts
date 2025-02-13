// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { DidContexts, IDidVerifiableCredential } from "@twin.org/standards-w3c-did";
import type { IComplianceEvidence } from "./IComplianceEvidence";
import { FederatedCatalogueTypes } from "./fedCatalogueTypes";

/**
 * A Compliance credential.
 */
export interface IComplianceCredential extends IDidVerifiableCredential {
	/** The LD Context. */
	"@context": [
		typeof DidContexts.ContextVCv2,
		typeof FederatedCatalogueTypes.Gaia_X_LD_Context,
		typeof FederatedCatalogueTypes.W3Id_Security_JWS_Context
	];
	/**
	 * The Id of the credential, it is mandatory.
	 */
	id: string;

	/**
	 * Compliance evidence.
	 *
	 */
	evidence: IComplianceEvidence[];
}
