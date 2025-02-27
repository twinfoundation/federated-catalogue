// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IParticipant } from "../../gaia-x/IParticipant";
import type { ICredential } from "../ICredential";

/**
 * Participant Credential.
 */
export interface IParticipantCredential extends ICredential {
	/**
	 * The Credential Subject
	 */
	credentialSubject: IParticipant;
}
