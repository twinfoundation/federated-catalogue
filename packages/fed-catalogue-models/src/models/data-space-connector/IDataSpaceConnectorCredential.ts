// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDidVerifiableCredential } from "@twin.org/standards-w3c-did";
import type { IDataSpaceConnector } from "./IDataSpaceConnector";

/**
 * Participant Credential.
 */
export interface IDataSpaceConnectorCredential extends IDidVerifiableCredential {
	/**
	 * The Credential Subject
	 */
	credentialSubject: IDataSpaceConnector;
}
