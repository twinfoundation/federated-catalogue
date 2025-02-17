// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { DidContexts, IDidVerifiableCredential } from "@twin.org/standards-w3c-did";
import type { IComplianceEvidence } from "./IComplianceEvidence";
import type { GaiaXTypes } from "../gaia-x/gaiaxTypes";

/**
 * A Compliance credential.
 */
export interface IComplianceCredential extends IDidVerifiableCredential {
	/**
	 * The LD Context.
	 */
	"@context": [
		typeof DidContexts.ContextVCv2,
		typeof GaiaXTypes.Gaia_X_LD_Context,
		typeof GaiaXTypes.W3Id_Security_JWS_Context
	];
	/**
	 * The Id of the credential, it is mandatory.
	 */
	id: string;

	/**
	 * Compliance evidence. It is mandatory.
	 *
	 */
	evidence: IComplianceEvidence[];
}
