# Scripts

This folder contains scripts used to generate the testing dataset.

## Javascript scripts

### Digest calculation

This script calculates a W3C SRI digest of JSON Content.

Example of usage:

```sh
node calculateDigest.js "$(cat ../dataset/credentials/evidences/acme-terms-conditions.json)"
```

### JsonWebSignature2020 Signature

It generates a Data Integrity proof that contains a `JsonWebSignature2020` for a credential expressed in JSON-LD.

Example of usage:

```sh
node ./signCredentialJsonWebSignature.js "$(cat ../dataset/credentials/evidences/acme-legal-entity.json)" "did:iota:testnet:0xb0d60698c3ad801241881650176245556f90ca0c9ed7584ca250f312e9ec95c8#4LQ8esc5syDl5oLckS8_QJ8vZ99DEsm-uBxXN4OehXU" "$(cat ../dataset/identities/notary/notary.json)"
```

## Shell scripts

The shell script names (`.sh`) are auto-descriptive and are used to generate the different credentials that intervene in the testing process. The Credential generation is using an onboarding tool developed by the IOTA Foundation and which is conveniently dockerized.
