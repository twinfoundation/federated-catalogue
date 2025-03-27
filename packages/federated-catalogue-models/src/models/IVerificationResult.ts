// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Verification Result
 */
export interface IVerificationResult {
	/**
	 * True if verified. False the opposite.
	 */
	verified: boolean;
	/**
	 * Verification failure reason.
	 */
	verificationFailureReason?: string;
}
