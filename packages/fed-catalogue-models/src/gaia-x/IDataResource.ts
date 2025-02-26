// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IJsonLdContextDefinitionElement, IJsonLdNodeObject } from "@twin.org/data-json-ld";
import type { GaiaXContexts } from "./gaiaxContexts";
import type { GaiaXTypes } from "./gaiaxTypes";
import type { IDataExchangeComponent } from "./IDataExchangeComponent";
import type { IDataSpaceConnector } from "../models/data-space-connector/IDataSpaceConnector";

/**
 * A Data Resource as defined by Gaia-X.
 * See also W3C DCAT Dataset
 */
export interface IDataResource extends IJsonLdNodeObject {
	/**
	 * The LD Context
	 */
	"@context":
		| typeof GaiaXContexts.Gaia_X_LD_Context
		| [typeof GaiaXContexts.Gaia_X_LD_Context, ...IJsonLdContextDefinitionElement[]];

	/**
	 * Subject Id
	 */
	id: string;

	/**
	 * Subject type
	 */
	type: typeof GaiaXTypes.DataResource;

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
}
