# Scripts

This folder contains scripts used to generate the testing dataset.

## Javascript scripts

### Digest calculation

This script calculates a W3C SRI digest of JSON Content.

Example of usage:

```sh
node ./calculateDigest.js
```

### JsonWebSignature2020 Signature

It generates a Data Integrity proof that contains a `JsonWebSignature2020` for a Credential expressed in JSON-LD.

Example of usage:

```sh
node ./signCredentialJsonWebSignature.js
```

## Shell scripts

The shell script names are auto-descriptive and are used to generate the different credentials that intervene in the testing process. The Credential generation is used an onboarding tool developed by the IOTA Foundation and which is conveniently dockerized.
