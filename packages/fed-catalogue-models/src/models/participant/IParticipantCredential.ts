// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDidVerifiableCredential } from "@twin.org/standards-w3c-did";
import type { IParticipant } from "../../gaia-x/IParticipant";

/**
 * Participant Credential.
 */
export interface IParticipantCredential extends IDidVerifiableCredential {
	/**
	 * The Credential Subject
	 */
	credentialSubject: IParticipant;
}
