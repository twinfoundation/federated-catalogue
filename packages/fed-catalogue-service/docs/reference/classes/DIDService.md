# Class: DIDService

DID Service.

## Constructors

### new DIDService()

> **new DIDService**(`didResolver`, `logger`): [`DIDService`](DIDService.md)

Constructor.

#### Parameters

• **didResolver**: `DidResolver`

DID Resolver.

• **logger**: `ILoggingConnector`

Logging.

#### Returns

[`DIDService`](DIDService.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

***

### \_didCache

> `private` `readonly` **\_didCache**: `Record`\<`string`, `DIDDocument`\>

***

### \_certificateCache

> `private` `readonly` **\_certificateCache**: `Record`\<`string`, `string`\>

***

### \_didResolver

> `private` `readonly` **\_didResolver**: `DidResolver`

***

### \_logger

> `private` `readonly` **\_logger**: `ILoggingConnector`

Logging service.

## Methods

### getDIDDocumentFromDID()

> **getDIDDocumentFromDID**(`did`): `Promise`\<`DIDDocument`\>

Returns DID Doc from DID.

#### Parameters

• **did**: `string`

DID.

#### Returns

`Promise`\<`DIDDocument`\>

DID Document.

***

### getJWKFromDID()

> **getJWKFromDID**(`didDocument`, `verificationMethodName`): `undefined` \| `JsonWebKey`

Gets JWK from DID.

#### Parameters

• **didDocument**: `DIDDocument`

DID Doc.

• **verificationMethodName**: `string`

Ver method.

#### Returns

`undefined` \| `JsonWebKey`

JWK.

#### Throws

Error

***

### getPublicKeyFromJWK()

> **getPublicKeyFromJWK**(`jwk`): `Promise`\<`KeyLike`\>

Public key from JWK.

#### Parameters

• **jwk**: `JsonWebKey`

JWK.

#### Returns

`Promise`\<`KeyLike`\>

Public Key.

***

### checkx5uMatchesPublicKey()

> **checkx5uMatchesPublicKey**(`publicKey`, `x5uURL`): `Promise`\<`boolean`\>

Checks X5U matches public key.

#### Parameters

• **publicKey**: `KeyLike`

PK.

• **x5uURL**: `string`

X5U URL.

#### Returns

`Promise`\<`boolean`\>

Bool.

#### Throws

Error.

***

### loadCertificatesRaw()

> **loadCertificatesRaw**(`url`): `Promise`\<`string`\>

Loads Raw Certificate.

#### Parameters

• **url**: `string`

URL.

#### Returns

`Promise`\<`string`\>

Raw Certificate.
