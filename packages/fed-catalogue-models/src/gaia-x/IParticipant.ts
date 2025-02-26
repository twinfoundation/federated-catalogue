// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IJsonLdContextDefinitionElement, IJsonLdNodeObject } from "@twin.org/data-json-ld";
import type { GaiaXContexts } from "./gaiaxContexts";
import type { GaiaXTypes } from "./gaiaxTypes";
import type { IAddress } from "./IAddress";
import type { IRegistrationNumber } from "./IRegistrationNumber";

/**
 * A Legal Person participating in the ecosystem
 */
export interface IParticipant extends IJsonLdNodeObject {
	/**
	 * The LD context
	 */
	"@context":
		| typeof GaiaXContexts.Gaia_X_LD_Context
		| [typeof GaiaXContexts.Gaia_X_LD_Context, ...IJsonLdContextDefinitionElement[]];

	/**
	 * The participant Id.
	 */
	id: string;

	/**
	 * JSON-LD type.
	 */
	type: typeof GaiaXTypes.Participant;

	/**
	 * The legal registration number.
	 */
	registrationNumber: IRegistrationNumber;

	/**
	 * The legal name.
	 */
	legalName: string;

	/**
	 * Legal Address
	 *
	 */
	legalAddress: IAddress;
}
