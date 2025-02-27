# Interface: IComplianceCredential

A Compliance credential.

## Extends

- [`ICredential`](ICredential.md)

## Properties

### @context

> **@context**: \[`"https://www.w3.org/ns/credentials/v2"`, `"https://w3id.org/gaia-x/development"`, `"https://w3id.org/security/suites/jws-2020/v1"`, `...string[]`\]

The LD Context.

#### Overrides

`ICredential.@context`

***

### id

> **id**: `string`

The Id of the credential, it is mandatory.

#### Overrides

[`ICredential`](ICredential.md).[`id`](ICredential.md#id)

***

### type

> **type**: \[`"VerifiableCredential"`, `"ComplianceCredential"`\]

Type of Credential.

#### Overrides

`ICredential.type`

***

### evidence

> **evidence**: [`IComplianceEvidence`](IComplianceEvidence.md)[]

Compliance evidence. It is mandatory.

#### Overrides

`ICredential.evidence`

***

### credentialSubject

> **credentialSubject**: `IJsonLdNodeObject` & `object` \| `IJsonLdNodeObject`[] & `object`

Credential subject must always include id and type

#### Inherited from

[`ICredential`](ICredential.md).[`credentialSubject`](ICredential.md#credentialsubject)
