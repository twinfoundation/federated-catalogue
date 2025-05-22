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

### id

> **id**: `string`

The Id of the credential, it is mandatory.

#### Overrides

`IDidVerifiableCredential.id`

***

### issuer

> **issuer**: `string`

The issuer of the credential, it is mandatory.

#### Overrides

`IDidVerifiableCredential.issuer`

***

### credentialSubject

> **credentialSubject**: `IJsonLdNodeObject` & `object` \| `IJsonLdNodeObject`[] & `object`

Credential subject must always include id and type

#### Overrides

`IDidVerifiableCredential.credentialSubject`
