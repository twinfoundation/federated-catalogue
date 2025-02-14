// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { IJsonLdNodeObject } from "@twin.org/data-json-ld";

/**
 * Address as defined by Gaia-X
 * https://docs.gaia-x.eu/ontology/development/classes/Address/
 */
export interface IAddress extends IJsonLdNodeObject {
	/**
	 * Country code in ISO 3166-1 alpha2, alpha-3 or numeric format
	 */
	countryCode: string | number;
}
