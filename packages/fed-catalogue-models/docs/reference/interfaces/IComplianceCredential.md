# Interface: IComplianceCredential

A Compliance credential.

## Extends

- [`ICredential`](ICredential.md)

## Properties

### credentialStatus?

> `optional` **credentialStatus**: `IDidCredentialStatus` \| `IDidCredentialStatus`[]

Used to discover information about the current status of the
verifiable credential, such as whether it is suspended or revoked.

#### Inherited from

[`ICredential`](ICredential.md).[`credentialStatus`](ICredential.md#credentialstatus)

***

### credentialSchema?

> `optional` **credentialSchema**: `IDidCredentialSchema` \| `IDidCredentialSchema`[]

Annotate type definitions or lock them to specific versions of the vocabulary.

#### Inherited from

[`ICredential`](ICredential.md).[`credentialSchema`](ICredential.md#credentialschema)

***

### issuer?

> `optional` **issuer**: `string` \| \{ `id`: `string`; `name`: `string` \| `IDidLabel`[]; `description`: `string` \| `IDidLabel`[]; \}

The issuing identity.

#### Inherited from

[`ICredential`](ICredential.md).[`issuer`](ICredential.md#issuer)

***

### issuanceDate?

> `optional` **issuanceDate**: `string`

The date the verifiable credential was issued.

#### Inherited from

[`ICredential`](ICredential.md).[`issuanceDate`](ICredential.md#issuancedate)

***

### name?

> `optional` **name**: `string` \| `IDidLabel`[]

The name of the credential.

#### Inherited from

[`ICredential`](ICredential.md).[`name`](ICredential.md#name)

***

### description?

> `optional` **description**: `string` \| `IDidLabel`[]

The description of the credential.

#### Inherited from

[`ICredential`](ICredential.md).[`description`](ICredential.md#description)

***

### validFrom?

> `optional` **validFrom**: `string`

The date the verifiable credential is valid from.

#### Inherited from

[`ICredential`](ICredential.md).[`validFrom`](ICredential.md#validfrom)

***

### validUntil?

> `optional` **validUntil**: `string`

The date the verifiable credential is valid until.

#### Inherited from

[`ICredential`](ICredential.md).[`validUntil`](ICredential.md#validuntil)

***

### proof?

> `optional` **proof**: `IProof` \| `IProof`[]

Proofs that the verifiable credential is valid.
Optional if a different proof method is used, such as JWT.

#### Inherited from

[`ICredential`](ICredential.md).[`proof`](ICredential.md#proof)

***

### @context

> **@context**: \[`"https://www.w3.org/ns/credentials/v2"`, `"https://w3id.org/gaia-x/development"`, `"https://w3id.org/security/suites/jws-2020/v1"`, `...string[]`\]

The LD Context.

#### Overrides

[`ICredential`](ICredential.md).[`@context`](ICredential.md#@context)

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

[`ICredential`](ICredential.md).[`type`](ICredential.md#type)

***

### evidence

> **evidence**: [`IComplianceEvidence`](IComplianceEvidence.md)[]

Compliance evidence. It is mandatory.

#### Overrides

[`ICredential`](ICredential.md).[`evidence`](ICredential.md#evidence)

***

### credentialSubject

> **credentialSubject**: `IJsonLdNodeObject` & `object` \| `IJsonLdNodeObject`[] & `object`

Credential subject must always include id and type

#### Inherited from

[`ICredential`](ICredential.md).[`credentialSubject`](ICredential.md#credentialsubject)
