// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDidDocument } from "@twin.org/standards-w3c-did";

/**
 * Universal Resolver DIF resolution result
 */
export interface IDidResolutionResult {
	/**
	 * DID Document resolved.
	 */
	didDocument: IDidDocument;

	/**
	 * Resolution metadata
	 */
	didResolutionMetadata: unknown;

	/**
	 * DID Document metadata
	 */
	didDocumentMetadata: unknown;
}
