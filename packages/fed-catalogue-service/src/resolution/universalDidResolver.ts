// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IIdentityResolverConnector } from "@twin.org/identity-models";
import { nameof } from "@twin.org/nameof";
import type { IDidDocument } from "@twin.org/standards-w3c-did";
import { FetchHelper, HttpMethod } from "@twin.org/web";
import type { IDidResolutionResult } from "./IDidResolutionResult";

/**
 * Universal DID Resolver using DIF's serviced
 */
export class UniversalDidResolver implements IIdentityResolverConnector {
	public readonly CLASS_NAME = nameof<UniversalDidResolver>();

	/**
	 * Resolver's endpoint
	 */
	private readonly _resolverEndpoint: string;

	/**
	 * Constructs a new resolver.
	 * @param resolverEndpoint Resolver endpoint
	 */
	constructor(resolverEndpoint: string) {
		this._resolverEndpoint = resolverEndpoint;
	}

	/**
	 * Resolve a document from its id.
	 * @param documentId The id of the document to resolve.
	 * @returns The resolved document.
	 * @throws NotFoundError if the id can not be resolved.
	 */
	public async resolveDocument(documentId: string): Promise<IDidDocument> {
		const url = `${this._resolverEndpoint}/1.0/identifiers/${encodeURIComponent(documentId)}`;

		// To Resolve just call the universal resolver
		const result = await FetchHelper.fetchJson<unknown, IDidResolutionResult>(
			this.CLASS_NAME,
			url,
			HttpMethod.GET
		);

		return result.didDocument;
	}
}
