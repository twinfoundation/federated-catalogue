// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IJsonLdContextDefinitionElement, IJsonLdNodeObject } from "@twin.org/data-json-ld";
import type { GaiaXContexts } from "./gaiaxContexts";
import type { GaiaXTypes } from "./gaiaxTypes";
import type { IEndpoint } from "./IEndpoint";

/**
 * A Service offering
 */
export interface IServiceOffering extends IJsonLdNodeObject {
	/**
	 * The LD context
	 */
	"@context":
		| typeof GaiaXContexts.Gaia_X_LD_Context
		| [typeof GaiaXContexts.Gaia_X_LD_Context, ...IJsonLdContextDefinitionElement[]];

	/**
	 * Id
	 */
	id: string;

	/**
	 * Type
	 */
	type: typeof GaiaXTypes.ServiceOffering;

	/**
	 * Description
	 */
	description?: string;

	/**
	 * Name
	 */
	name: string;

	/**
	 * Participant that provides the offering
	 */
	providedBy: string;

	/**
	 * ODRL policy associated to the service offering
	 */
	servicePolicy: IJsonLdNodeObject;

	/**
	 * Resources aggregated
	 */
	aggregationOfResources?: string[];

	/**
	 * The endpoint
	 */
	endpoint: IEndpoint;
}
