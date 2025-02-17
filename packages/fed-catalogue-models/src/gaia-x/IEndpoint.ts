// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IJsonLdNodeObject } from "@twin.org/data-json-ld";

/**
 * Endpoint as defined by the Gaia-X ontology.
 * https://docs.gaia-x.eu/ontology/development/classes/Endpoint
 */
export interface IEndpoint extends IJsonLdNodeObject {
	/**
	 * The type of JSON-LD node
	 */
	type: "Endpoint";

	/**
	 *
	 * The endpoint URL
	 */
	endpointURL: string;

	/**
	 *
	 * The formal description
	 */
	formalDescription?: string;

	/**
	 *
	 * Standards conformity
	 */
	standardConformity: IJsonLdNodeObject;
}
