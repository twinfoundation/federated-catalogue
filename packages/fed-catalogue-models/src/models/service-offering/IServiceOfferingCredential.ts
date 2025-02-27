// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IServiceOffering } from "../../gaia-x/IServiceOffering";
import type { ICredential } from "../ICredential";

/**
 * A Service Offering Credential
 */
export interface IServiceOfferingCredential extends ICredential {
	/**
	 * The Credential Subject
	 */
	credentialSubject: IServiceOffering;
}
