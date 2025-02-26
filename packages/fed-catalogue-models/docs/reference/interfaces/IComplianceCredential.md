# Interface: IComplianceCredential

A Compliance credential.

## Extends

- `IDidVerifiableCredential`

## Properties

### @context

> **@context**: \[`"https://www.w3.org/ns/credentials/v2"`, `"https://w3id.org/gaia-x/development"`, `"https://w3id.org/security/suites/jws-2020/v1"`, `...string[]`\]

The LD Context.

#### Overrides

`IDidVerifiableCredential.@context`

***

### id

> **id**: `string`

The Id of the credential, it is mandatory.

#### Overrides

`IDidVerifiableCredential.id`

***

### evidence

> **evidence**: [`IComplianceEvidence`](IComplianceEvidence.md)[]

Compliance evidence. It is mandatory.

#### Overrides

`IDidVerifiableCredential.evidence`
