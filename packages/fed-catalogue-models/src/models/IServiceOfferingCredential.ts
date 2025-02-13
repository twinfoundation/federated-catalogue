// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { IDidVerifiableCredential } from "@twin.org/standards-w3c-did";
import { IServiceOfferingSubject } from "./IServiceOffringSubject";

export interface IServiceOfferingCredential extends IDidVerifiableCredential {
	"@context": string[];
	type: string;
	id: string;
	issuer: string;
	validFrom: string;
	validUntil: string;
	credentialSubject: IServiceOfferingSubject
}
