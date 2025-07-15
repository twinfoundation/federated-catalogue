// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { ILegalPerson } from "@twin.org/standards-gaia-x";
import type { ICredential } from "../ICredential";

/**
 * Participant Credential.
 */
export interface IParticipantCredential extends ICredential {
	/**
	 * The Credential Subject
	 */
	credentialSubject: ILegalPerson;
}
