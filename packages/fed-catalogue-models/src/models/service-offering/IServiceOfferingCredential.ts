// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { IDidVerifiableCredential } from "@twin.org/standards-w3c-did";
import { IServiceOfferingSubject } from "./IServiceOfferingSubject";

export interface IServiceOfferingCredential extends IDidVerifiableCredential {
	credentialSubject: IServiceOfferingSubject;
}
