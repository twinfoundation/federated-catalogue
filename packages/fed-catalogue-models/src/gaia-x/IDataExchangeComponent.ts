// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { IJsonLdNodeObject } from "@twin.org/data-json-ld";
import { IEndpoint } from "./IEndpoint";

/**
 * Data Exchange component as defined by Gaia-X
 * https://docs.gaia-x.eu/ontology/development/classes/DataExchangeComponent
 */
export interface IDataExchangeComponent extends IJsonLdNodeObject {
	/** The type of JSON-LD node */
	type: "DataExchangeComponent";

	/** The endpoint */
	endpoint: IEndpoint;
}
