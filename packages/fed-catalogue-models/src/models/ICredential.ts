// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDidVerifiableCredential } from "@twin.org/standards-w3c-did";

/**
 * A credential with subject.
 */
export interface ICredential extends IDidVerifiableCredential {
	/**
	 * The Id of the credential, it is mandatory.
	 */
	id: string;

	/**
	 * Credential subject must always include id and type
	 */
	credentialSubject: IDidVerifiableCredential["credentialSubject"] & {
		id: string;
		type: string | string[];
	};
}
