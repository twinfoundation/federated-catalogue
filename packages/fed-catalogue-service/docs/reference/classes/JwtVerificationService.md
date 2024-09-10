# Class: JwtVerificationService

## Constructors

### new JwtVerificationService()

> **new JwtVerificationService**(`loggingService`): [`JwtVerificationService`](JwtVerificationService.md)

#### Parameters

• **loggingService**: `ILoggingConnector`

#### Returns

[`JwtVerificationService`](JwtVerificationService.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

***

### \_didService

> `private` `readonly` **\_didService**: [`DIDService`](DIDService.md)

DID service.

## Methods

### decodeJwt()

> **decodeJwt**(`jwt`): `Promise`\<`object`\>

Decodes the JWT.

#### Parameters

• **jwt**: `string`

JWT.

#### Returns

`Promise`\<`object`\>

Decoded.

***

### decodeJWTHeaders()

> `private` **decodeJWTHeaders**(`jwtVerifiablePresentation`): `ProtectedHeaderParameters`

Decodes JWT headers.

#### Parameters

• **jwtVerifiablePresentation**: `string`

a jwt containing a verifiable presentation as payload

#### Returns

`ProtectedHeaderParameters`

ProtectedHeader parameters

#### Throws

BadRequestException if the string is not a valid JWT

#### Throws

InternalServerErrorException if the token was not decoded for an unknown reason

***

### getMandatoryHeadersOrFail()

> `private` **getMandatoryHeadersOrFail**(`decodedHeaders`): `object`

Retrieves the two mandatory headers iss & kid from a JWT headers.
Throws a BadRequestException if one of them is not present.

#### Parameters

• **decodedHeaders**: `ProtectedHeaderParameters`

Decoded headers.

#### Returns

`object`

Issuer and kid.

##### iss

> **iss**: `string`

##### kid

> **kid**: `string`

#### See

https://www.w3.org/TR/vc-jose-cose/#using-header-params-claims-key-discovery

***

### checkKidIsPresent()

> `private` **checkKidIsPresent**(`kid`): `void`

Checks whether the kid header passed as parameter is present.

#### Parameters

• **kid**: `string`

a jwt header, might be null, empty or undefined

#### Returns

`void`

#### Throws

BadRequestException if the header is not filled

***

### checkIssIsPresent()

> `private` **checkIssIsPresent**(`iss`): `void`

Checks whether the iss header passed as parameter is present.

#### Parameters

• **iss**: `string`

a jwt header, might be null, empty or undefined

#### Returns

`void`

#### Throws

BadRequestException if the header is not filled

***

### getJwkFromDid()

> `private` **getJwkFromDid**(`DID`, `kid`): `undefined` \| `JsonWebKey`

Retrieves the verificationMethod JWK from a DID based on the JWT's kid header.

#### Parameters

• **DID**: `DIDDocument`

the DIDDocument.

• **kid**: `string`

the verificationMethod name.

#### Returns

`undefined` \| `JsonWebKey`

JWK

#### Throws

GeneralError

***

### decodeJWTWithKey()

> `private` **decodeJWTWithKey**(`jwt`, `key`): `Promise`\<`JWTVerifyResult`\>

Decode JWT.

#### Parameters

• **jwt**: `string`

JWT.

• **key**: `KeyLike`

Key.

#### Returns

`Promise`\<`JWTVerifyResult`\>

Verification result.
