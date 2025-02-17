// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type {
	IJsonLdContextDefinitionElement,
	IJsonLdKeyword,
	IJsonLdNodeObject
} from "@twin.org/data-json-ld";
import type { IDSATypes } from "./idsaTypes";
import type { IDataResource } from "../gaia-x/IDataResource";
import type { IEndpoint } from "../gaia-x/IEndpoint";

/**
 * Data Space Connector. It extends the IDSA's Connector definition.
 * https://international-data-spaces-association.github.io/InformationModel/docs/index.html#Connector
 */
export interface IDataSpaceConnector extends IJsonLdNodeObject {
	/**
	 * The LD Context.
	 */
	"@context": [typeof IDSATypes.IDSA_LD_Context, ...IJsonLdContextDefinitionElement[]];

	/**
	 * A Connector
	 */
	type: ["Connector", ...IJsonLdKeyword["@type"][]];

	/**
	 * Connector's Identity
	 */
	identity: string;

	/**
	 * The default endpoint of the Connector.
	 * This endpoint can be used as a base to guess other endpoints in case they are not explicitly declared.
	 */
	defaultEndpoint: IEndpoint;

	/**
	 * The endpoint used for data subscription by Consumers.
	 * If the endpoint URL is a relative reference to a URL then it should be resolved using the
	 * default endpoint URL as a base URL.
	 */
	subscriptionEndpoint: IEndpoint;

	/**
	 * The endpoint used by Providers to push data.
	 * If the endpoint URL is a relative reference to a URL then it should be resolved using the
	 * default endpoint URL as a base URL.
	 */
	pushEndpoint: IEndpoint;

	/**
	 * The resources offered by this Connector.
	 * A resource index is usually a relative reference to the default endpoint base URL.
	 * Nonetheless if the resource already declares an endpoint URL that one should be taken.
	 *
	 */
	resourceCatalog: {
		offeredResource: { [resourceIndex: string]: IDataResource };
	};
}
