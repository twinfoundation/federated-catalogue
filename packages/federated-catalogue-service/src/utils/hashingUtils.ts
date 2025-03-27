// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Base64 } from "@twin.org/core";
import { Sha256, Sha512 } from "@twin.org/crypto";

/**
 * Hashing utils
 * @internal
 */
export abstract class HashingUtils {
	/**
	 * Generates sha-256 hash encoded as base64.
	 * @param input The input bytes.
	 * @returns Base64 hash.
	 */
	public static sha256(input: string): string | null {
		if (!input) {
			return null;
		}

		const data = Sha256.sum256(new TextEncoder().encode(input));

		return Base64.encode(data);
	}

	/**
	 * Generates sha-512 hash encoded as base64.
	 * @param input The input bytes.
	 * @returns Base64 hash.
	 */
	public static sha512(input: string): string | null {
		if (!input) {
			return null;
		}

		const data = Sha512.sum512(new TextEncoder().encode(input));

		return Base64.encode(data);
	}
}
