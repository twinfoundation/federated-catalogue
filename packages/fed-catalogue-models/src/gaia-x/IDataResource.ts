// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IJsonLdContextDefinitionElement, IJsonLdNodeObject } from "@twin.org/data-json-ld";
import type { GaiaXTypes } from "./gaiaxTypes";
import type { IDataExchangeComponent } from "./IDataExchangeComponent";
import type { IEndpoint } from "./IEndpoint";
import type { IDataSpaceConnector } from "../idsa/IDataSpaceConnector";
import type { IDSATypes } from "../idsa/idsaTypes";

/**
 * A Data Resource as defined by Gaia-X and IDSA.
 */
export interface IDataResource extends IJsonLdNodeObject {
	/**
	 * The LD Context
	 */
	"@context": [
		typeof IDSATypes.IDSA_LD_Context,
		typeof GaiaXTypes.Gaia_X_LD_Context,
		...IJsonLdContextDefinitionElement[]
	];
	/**
	 * Subject Id
	 */
	id: string;

	/**
	 * Subject type
	 */
	type: "DataResource";

	/**
	 * Description
	 */
	description?: string;

	/**
	 * The Resource Name
	 */
	name: string;

	/**
	 * Exposed through endpoint
	 */
	exposedThrough?: IDataExchangeComponent | IDataSpaceConnector;

	/**
	 * Who is the data producer
	 */
	producedBy: string;

	/**
	 * Pointer (URL) to the license
	 */
	license: string;

	/**
	 * Copyright owner
	 */
	copyrightOwnedBy?: string;

	/**
	 * ODRL Policy
	 */
	resourcePolicy: IJsonLdNodeObject;

	/**
	 * The Data Resource endpoint.
	 *
	 */
	resourceEndpoint?: IEndpoint;
}
