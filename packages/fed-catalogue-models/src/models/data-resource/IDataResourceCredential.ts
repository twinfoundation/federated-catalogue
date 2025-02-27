// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDataResource } from "../../gaia-x/IDataResource";
import type { ICredential } from "../ICredential";

/**
 * Data Resource Credential
 */
export interface IDataResourceCredential extends ICredential {
	/**
	 * The subject of the Credential
	 */
	credentialSubject: IDataResource;
}
