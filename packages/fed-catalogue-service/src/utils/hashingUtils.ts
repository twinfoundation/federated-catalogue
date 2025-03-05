// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/* eslint-disable jsdoc/require-jsdoc */

import { createHash } from "node:crypto";

export abstract class HashingUtils {
	public static sha256(input: string): string | null {
		if (!input) {
			return null;
		}

		return createHash("sha256").update(input).digest("base64");
	}

	public static sha512(input: string): string | null {
		if (!input) {
			return null;
		}

		return createHash("sha512").update(input).digest("base64");
	}
}
