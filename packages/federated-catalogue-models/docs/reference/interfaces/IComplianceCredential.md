# Interface: IComplianceCredential

A Compliance credential.

## Extends

- [`ICredential`](ICredential.md)

## Properties

### @context

> **@context**: \[`"https://www.w3.org/ns/credentials/v2"`, `"https://w3id.org/gaia-x/development"`, `"https://w3id.org/security/suites/jws-2020/v1"`, `...IJsonLdContextDefinitionElement[]`\]

The LD Context.

#### Overrides

`ICredential.@context`

***

### type

> **type**: \[`"VerifiableCredential"`, `"ComplianceCredential"`\]

Type of Credential.

#### Overrides

`ICredential.type`

***

### validFrom

> **validFrom**: `string`

A compliance credential requires a validity period

#### Overrides

`ICredential.validFrom`

***

### validUntil

> **validUntil**: `string`

A compliance credential requires a validity period

#### Overrides

`ICredential.validUntil`

***

### evidence

> **evidence**: [`IComplianceEvidence`](IComplianceEvidence.md)[]

Compliance evidence. It is mandatory.

#### Overrides

`ICredential.evidence`

***

### id

> **id**: `string`

The Id of the credential, it is mandatory.

#### Inherited from

[`ICredential`](ICredential.md).[`id`](ICredential.md#id)

***

### issuer

> **issuer**: `string`

The issuer of the credential, it is mandatory.

#### Inherited from

[`ICredential`](ICredential.md).[`issuer`](ICredential.md#issuer)

***

### credentialSubject

> **credentialSubject**: `IJsonLdNodeObject` & `object` \| `IJsonLdNodeObject`[] & `object`

Credential subject must always include id and type

#### Inherited from

[`ICredential`](ICredential.md).[`credentialSubject`](ICredential.md#credentialsubject)
