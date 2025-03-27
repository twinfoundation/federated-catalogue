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

	/**
	 * Filled in case an evidence cannot be verified to provide the reason
	 */
	evidenceVerificationResult?: IVerificationResult;

	/**
	 * The evidences that failed to be verified.
	 */
	evidenceFailedToVerify?: string[];
}
