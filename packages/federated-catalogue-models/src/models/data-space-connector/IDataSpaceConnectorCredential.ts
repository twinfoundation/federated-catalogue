// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDataSpaceConnector } from "./IDataSpaceConnector";
import type { ICredential } from "../ICredential";

/**
 * Participant Credential.
 */
export interface IDataSpaceConnectorCredential extends ICredential {
	/**
	 * The Credential Subject
	 */
	credentialSubject: IDataSpaceConnector;
}
