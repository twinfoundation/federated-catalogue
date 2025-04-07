// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type {
	IJsonLdContextDefinitionElement,
	IJsonLdKeyword,
	IJsonLdNodeObject
} from "@twin.org/data-json-ld";
import type {
	GaiaXContexts,
	GaiaXTypes,
	IDataExchangeComponent,
	IDataResource,
	IEndpoint
} from "@twin.org/standards-gaia-x";
import type { FederatedCatalogueTypes } from "../federatedCatalogueTypes";

/**
 * TWIN Data Space Connector.
 */
export interface IDataSpaceConnector extends IDataExchangeComponent {
	/**
	 * The LD Context.
	 */
	"@context": [typeof GaiaXContexts.GaiaXLdContext, ...IJsonLdContextDefinitionElement[]];

	/**
	 * A unique identifier given to this Data Space Connector.
	 */
	id: string;

	/**
	 * A Connector is a Data Exchange Component
	 */
	type: [
		typeof GaiaXTypes.DataExchangeComponent,
		typeof FederatedCatalogueTypes.DataSpaceConnector,
		...IJsonLdKeyword["@type"][]
	];

	/**
	 * Connector's Identity that allows to know public key of this Connector.
	 */
	identity: string;

	/**
	 * Who maintains this Data Space Connector.
	 */
	maintainer: string;

	/**
	 * The name of this Data Space Connector
	 */
	name?: string;

	/**
	 * A description of this Data Space Connector
	 */
	description?: string;

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
	subscriptionActivityEndpoint?: IEndpoint;

	/**
	 * The endpoint used by Providers to push data.
	 * If the endpoint URL is a relative reference to a URL then it should be resolved using the
	 * default endpoint URL as a base URL.
	 */
	pushActivityEndpoint: IEndpoint;

	/**
	 * The endpoint used by Consumers to pull data from.
	 * If the endpoint URL is a relative reference to a URL then it should be resolved using the
	 * default endpoint URL as a base URL.
	 */
	pullDataEndpoint: IEndpoint;

	/**
	 * The resources offered by this Connector.
	 * A resource index is usually a relative reference to the default endpoint base URL.
	 * Nonetheless if the resource already declares an endpoint URL that one should be taken.
	 * It is captured the case where the Data Resource is supplied
	 * via a list of identifiers or through a map indexed by Id
	 *
	 */
	offeredResource:
		| string[]
		| {
				[resourceId: string]:
					| IDataResource
					| (IJsonLdNodeObject & { id: string; type: typeof GaiaXTypes.DataResource });
		  };
}
