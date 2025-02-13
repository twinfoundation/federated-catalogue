// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDidVerifiableCredential } from "@twin.org/standards-w3c-did";
import type { IDataResourceSubject } from "./IDataResourceSubject";

/**
 * Data Resource Credential
 */
export interface IDataResourceCredential extends IDidVerifiableCredential {
	/**
	 * The subject of the Credential
	 */
	credentialSubject: IDataResourceSubject;
}
