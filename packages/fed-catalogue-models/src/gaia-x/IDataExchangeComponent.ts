// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IJsonLdNodeObject } from "@twin.org/data-json-ld";

/**
 * Data Exchange component as defined by Gaia-X
 * https://docs.gaia-x.eu/ontology/development/classes/DataExchangeComponent
 */
export interface IDataExchangeComponent extends IJsonLdNodeObject {
	/**
	 * The type of JSON-LD node
	 */
	type: "DataExchangeComponent";
}
