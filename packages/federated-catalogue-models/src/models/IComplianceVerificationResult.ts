// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { ICredential } from "./ICredential";
import type { IVerificationResult } from "./IVerificationResult";

/**
 * Compliance verification result
 */
export interface IComplianceVerificationResult extends IVerificationResult {
	/**
	 * The credentials involved
	 */
	credentials: ICredential[];
}
