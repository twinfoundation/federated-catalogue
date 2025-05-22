# Interface: IDataSpaceConnectorCredential

Participant Credential.

## Extends

- [`ICredential`](ICredential.md)

## Properties

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

> **credentialSubject**: [`IDataSpaceConnector`](IDataSpaceConnector.md)

The Credential Subject

#### Overrides

[`ICredential`](ICredential.md).[`credentialSubject`](ICredential.md#credentialsubject)
