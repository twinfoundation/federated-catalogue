# Interface: IDataResourceCredential

Data Resource Credential

## Extends

- [`ICredential`](ICredential.md)

## Properties

### @context

> **@context**: `"https://www.w3.org/2018/credentials/v1"` \| `"https://www.w3.org/ns/credentials/v2"` \| \[`"https://www.w3.org/ns/credentials/v2"`, `...IJsonLdContextDefinitionElement[]`\] \| \[`"https://www.w3.org/2018/credentials/v1"`, `...IJsonLdContextDefinitionElement[]`\]

The context for the verifiable credential.

#### Inherited from

[`ICredential`](ICredential.md).[`@context`](ICredential.md#@context)

***

### type

> **type**: `string` \| `string`[]

The types of the data stored in the verifiable credential.

#### Inherited from

[`ICredential`](ICredential.md).[`type`](ICredential.md#type)

***

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

### evidence?

> `optional` **evidence**: `IJsonLdNodeObject` \| `IJsonLdNodeObject`[]

Evidence associated with the Credential.

#### Inherited from

[`ICredential`](ICredential.md).[`evidence`](ICredential.md#evidence)

***

### proof?

> `optional` **proof**: `IProof` \| `IProof`[]

Proofs that the verifiable credential is valid.
Optional if a different proof method is used, such as JWT.

#### Inherited from

[`ICredential`](ICredential.md).[`proof`](ICredential.md#proof)

***

### id

> **id**: `string`

The Id of the credential, it is mandatory.

#### Inherited from

[`ICredential`](ICredential.md).[`id`](ICredential.md#id)

***

### credentialSubject

> **credentialSubject**: `IDataResource`

The subject of the Credential

#### Overrides

[`ICredential`](ICredential.md).[`credentialSubject`](ICredential.md#credentialsubject)
