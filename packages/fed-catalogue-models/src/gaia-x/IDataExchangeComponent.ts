// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IJsonLdKeyword, IJsonLdNodeObject } from "@twin.org/data-json-ld";
import type { GaiaXTypes } from "./gaiaxTypes";

/**
 * Data Exchange component as defined by Gaia-X
 * https://docs.gaia-x.eu/ontology/development/classes/DataExchangeComponent
 */
export interface IDataExchangeComponent extends IJsonLdNodeObject {
	/**
	 * The type of JSON-LD node
	 */
	type:
		| typeof GaiaXTypes.DataExchangeComponent
		| [typeof GaiaXTypes.DataExchangeComponent, ...IJsonLdKeyword["@type"][]];
}
