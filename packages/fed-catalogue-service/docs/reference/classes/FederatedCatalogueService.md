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

## Methods

### registerComplianceCredential()

> **registerComplianceCredential**(`credentialJwt`): `Promise`\<`void`\>

Registers a compliance Credential to the service.

#### Parameters

• **credentialJwt**: `string`

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
