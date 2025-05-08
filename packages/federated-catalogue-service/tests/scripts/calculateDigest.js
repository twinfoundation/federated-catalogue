// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/* eslint-disable no-console */

/**
 * Script for calculating a digest of a credential following the subresource integrity
 * specification. See https://www.w3.org/TR/sri/
 *
 * Input: The JSON content of the credential as a string
 * Output: The digest following the SRI representation format.
 */

import { createHash } from 'node:crypto';
import { JsonHelper } from '@twin.org/core';

const jsonStrData = process.argv[2];

if (!jsonStrData) {
	console.log('Please provide JSON Content');
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(-1);
}

let jsonObject = JSON.parse(jsonStrData);
if (jsonObject.credential) {
	jsonObject = jsonObject.credential;
}
delete jsonObject.proof;

const canonical = JsonHelper.canonicalize(jsonObject);

const hash = sha256(canonical);

console.log(`sha256-${hash}`);

// eslint-disable-next-line jsdoc/require-jsdoc
function sha256(input) {
	if (!input) {
		return null;
	}

	return createHash('sha256').update(input).digest('base64');
}
