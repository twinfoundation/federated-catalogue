// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/* eslint-disable jsdoc/require-jsdoc */

import { Base64 } from "@twin.org/core";
import { Sha256, Sha512 } from "@twin.org/crypto";

export abstract class HashingUtils {
	public static sha256(input: string): string | null {
		if (!input) {
			return null;
		}

		const data = Sha256.sum256(new TextEncoder().encode(input));

		return Base64.encode(data);
	}

	public static sha512(input: string): string | null {
		if (!input) {
			return null;
		}

		const data = Sha512.sum512(new TextEncoder().encode(input));

		return Base64.encode(data);
	}
}
