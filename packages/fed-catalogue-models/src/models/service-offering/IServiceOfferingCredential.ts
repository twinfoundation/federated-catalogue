// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDidVerifiableCredential } from "@twin.org/standards-w3c-did";
import type { IServiceOffering } from "../../gaia-x/IServiceOffering";

/**
 * A Service Offering Credential
 */
export interface IServiceOfferingCredential extends IDidVerifiableCredential {
	/**
	 * The Credential Subject
	 */
	credentialSubject: IServiceOffering;
}
