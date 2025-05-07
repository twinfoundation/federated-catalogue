// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/* eslint-disable no-console */

import { createHash } from 'node:crypto';
import canonicalize from 'canonicalize';

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

const canonical = canonicalize(jsonObject);

const hash = sha256(canonical);

console.log(`sha256-${hash}`);

// eslint-disable-next-line jsdoc/require-jsdoc
function sha256(input) {
	if (!input) {
		return null;
	}

	return createHash('sha256').update(input).digest('base64');
}
