# Class: FederatedCatalogueService

Service for performing logging operations to a connector.

## Implements

- `IFederatedCatalogue`

## Constructors

### new FederatedCatalogueService()

> **new FederatedCatalogueService**(`options`?): [`FederatedCatalogueService`](FederatedCatalogueService.md)

Create a new instance of FederatedCatalogue service.

#### Parameters

• **options?**

The options for the connector.

• **options.loggingConnectorType?**: `string`

The type of the logging connector to use, defaults to "logging".

• **options.entityStorageConnectorName?**: `string`

The name of the Entity Connector, defaults to "participant-entry".

#### Returns

[`FederatedCatalogueService`](FederatedCatalogueService.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IFederatedCatalogue.CLASS_NAME`

***

### \_loggingService

> `private` `readonly` **\_loggingService**: `ILoggingConnector`

Logging service.

***

### \_entityStorage

> `private` `readonly` **\_entityStorage**: `IEntityStorageConnector`\<`ParticipantEntry`\>

Storage service.

***

### \_didService

> `private` `readonly` **\_didService**: [`DIDService`](DIDService.md)

DID service.

## Methods

### registerComplianceCredential()

> **registerComplianceCredential**(`credential`): `Promise`\<`void`\>

Registers a compliance Credential to the service.

#### Parameters

• **credential**: `string`

The credential (wrapped into a presentation) as JWT.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IFederatedCatalogue.registerComplianceCredential`

***

### query()

> **query**(`participantId`?, `legalRegistrationNumber`?, `lrnType`?, `cursor`?, `pageSize`?): `Promise`\<`object`\>

Query the federated catalogue.

#### Parameters

• **participantId?**: `string`

The identity of the participant.

• **legalRegistrationNumber?**: `string`

The legal registration number.

• **lrnType?**: `string`

The legal registration number type (EORI, VATID, GLEIF, KENYA_PIN, etc.)

• **cursor?**: `string`

The cursor to request the next page of entities.

• **pageSize?**: `number`

The maximum number of entities in a page.

#### Returns

`Promise`\<`object`\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

##### entities

> **entities**: `IParticipantEntry`[]

The entities, which can be partial if a limited keys list was provided.

##### cursor?

> `optional` **cursor**: `string`

An optional cursor, when defined can be used to call find to get more entities.

##### pageSize?

> `optional` **pageSize**: `number`

Number of entities to return.

##### totalEntities

> **totalEntities**: `number`

Total entities length.

#### Implementation of

`IFederatedCatalogue.query`

#### Throws

NotImplementedError if the implementation does not support retrieval.

***

### decodeJwt()

> `private` **decodeJwt**(`jwt`): `Promise`\<`object`\>

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

### decodeJWT()

> `private` **decodeJWT**(`jwt`, `key`): `Promise`\<`JWTVerifyResult`\>

Decode JWT.

#### Parameters

• **jwt**: `string`

JWT.

• **key**: `KeyLike`

Key.

#### Returns

`Promise`\<`JWTVerifyResult`\>

Verification result.
