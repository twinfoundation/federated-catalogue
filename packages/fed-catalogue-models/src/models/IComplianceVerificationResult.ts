// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDidVerifiableCredential } from "@twin.org/standards-w3c-did";
import type { IVerificationResult } from "./IVerificationResult";

/**
 * Compliance verification result
 */
export interface IComplianceVerificationResult extends IVerificationResult {
	/**
	 * The credentials involved
	 */
	credentials: IDidVerifiableCredential[];
}
