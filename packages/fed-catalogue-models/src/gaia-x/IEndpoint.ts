// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IJsonLdNodeObject } from "@twin.org/data-json-ld";
import type { GaiaXTypes } from "./gaiaxTypes";

/**
 * Endpoint as defined by the Gaia-X ontology.
 * https://docs.gaia-x.eu/ontology/development/classes/Endpoint
 */
export interface IEndpoint extends IJsonLdNodeObject {
	/**
	 * The type of JSON-LD node. In this case it is allowed to be omitted as it is usually a child node.
	 */
	type: typeof GaiaXTypes.Endpoint | undefined;

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
	standardConformity?: IJsonLdNodeObject;
}
