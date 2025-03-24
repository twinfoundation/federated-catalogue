# Interface: ICredential

A credential with subject.

## Extends

- `IDidVerifiableCredential`

## Extended by

- [`IParticipantCredential`](IParticipantCredential.md)
- [`IDataResourceCredential`](IDataResourceCredential.md)
- [`IServiceOfferingCredential`](IServiceOfferingCredential.md)
- [`IDataSpaceConnectorCredential`](IDataSpaceConnectorCredential.md)
- [`IComplianceCredential`](IComplianceCredential.md)

## Properties

### @context

> **@context**: `"https://www.w3.org/2018/credentials/v1"` \| `"https://www.w3.org/ns/credentials/v2"` \| \[`"https://www.w3.org/ns/credentials/v2"`, `...IJsonLdContextDefinitionElement[]`\] \| \[`"https://www.w3.org/2018/credentials/v1"`, `...IJsonLdContextDefinitionElement[]`\]

The context for the verifiable credential.

#### Inherited from

`IDidVerifiableCredential.@context`

***

### type

> **type**: `string` \| `string`[]

The types of the data stored in the verifiable credential.

#### Inherited from

`IDidVerifiableCredential.type`

***

### credentialStatus?

> `optional` **credentialStatus**: `IDidCredentialStatus` \| `IDidCredentialStatus`[]

Used to discover information about the current status of the
verifiable credential, such as whether it is suspended or revoked.

#### Inherited from

`IDidVerifiableCredential.credentialStatus`

***

### credentialSchema?

> `optional` **credentialSchema**: `IDidCredentialSchema` \| `IDidCredentialSchema`[]

Annotate type definitions or lock them to specific versions of the vocabulary.

#### Inherited from

`IDidVerifiableCredential.credentialSchema`

***

### issuer?

> `optional` **issuer**: `string` \| \{ `id`: `string`; `name`: `string` \| `IDidLabel`[]; `description`: `string` \| `IDidLabel`[]; \}

The issuing identity.

#### Inherited from

`IDidVerifiableCredential.issuer`

***

### issuanceDate?

> `optional` **issuanceDate**: `string`

The date the verifiable credential was issued.

#### Inherited from

`IDidVerifiableCredential.issuanceDate`

***

### name?

> `optional` **name**: `string` \| `IDidLabel`[]

The name of the credential.

#### Inherited from

`IDidVerifiableCredential.name`

***

### description?

> `optional` **description**: `string` \| `IDidLabel`[]

The description of the credential.

#### Inherited from

`IDidVerifiableCredential.description`

***

### validFrom?

> `optional` **validFrom**: `string`

The date the verifiable credential is valid from.

#### Inherited from

`IDidVerifiableCredential.validFrom`

***

### validUntil?

> `optional` **validUntil**: `string`

The date the verifiable credential is valid until.

#### Inherited from

`IDidVerifiableCredential.validUntil`

***

### evidence?

> `optional` **evidence**: `IJsonLdNodeObject` \| `IJsonLdNodeObject`[]

Evidence associated with the Credential.

#### Inherited from

`IDidVerifiableCredential.evidence`

***

### proof?

> `optional` **proof**: `IProof` \| `IProof`[]

Proofs that the verifiable credential is valid.
Optional if a different proof method is used, such as JWT.

#### Inherited from

`IDidVerifiableCredential.proof`

***

### id

> **id**: `string`

The Id of the credential, it is mandatory.

#### Overrides

`IDidVerifiableCredential.id`

***

### credentialSubject

> **credentialSubject**: `IJsonLdNodeObject` & `object` \| `IJsonLdNodeObject`[] & `object`

Credential subject must always include id and type

#### Overrides

`IDidVerifiableCredential.credentialSubject`
