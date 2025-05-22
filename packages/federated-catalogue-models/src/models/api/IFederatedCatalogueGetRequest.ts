// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { HeaderTypes, MimeTypes } from "@twin.org/web";

/**
 * Base interface for Federated Catalogue Get Requests
 */
export interface IFederatedCatalogueGetRequest {
	/**
	 * The headers which can be used to determine the response data type.
	 */
	headers?: {
		[HeaderTypes.Accept]: typeof MimeTypes.Json | typeof MimeTypes.JsonLd;
	};
}
