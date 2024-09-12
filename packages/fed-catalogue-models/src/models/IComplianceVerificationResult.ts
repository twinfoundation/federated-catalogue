// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IVerifiableCredential } from "./IVerifiableCredential";
import type { IVerificationResult } from "./IVerificationResult";

/* eslint-disable jsdoc/require-jsdoc */

export interface IComplianceVerificationResult extends IVerificationResult {
	credentials: { [type: string]: IVerifiableCredential };
}
