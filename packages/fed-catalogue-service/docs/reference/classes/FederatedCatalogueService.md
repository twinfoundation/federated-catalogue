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

### \_entityStorageParticipants

> `private` `readonly` **\_entityStorageParticipants**: `IEntityStorageConnector`\<`ParticipantEntry`\>

Storage service for participants.

***

### \_entityStorageSDs

> `private` `readonly` **\_entityStorageSDs**: `IEntityStorageConnector`\<`ServiceDescriptionEntry`\>

Storage service for service descriptions.

***

### \_entityStorageResources

> `private` `readonly` **\_entityStorageResources**: `IEntityStorageConnector`\<`DataResourceEntry`\>

Storage service for service descriptions.

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

### queryParticipants()

> **queryParticipants**(`id`?, `legalRegistrationNumber`?, `lrnType`?, `cursor`?, `pageSize`?): `Promise`\<`object`\>

Query the federated catalogue.

#### Parameters

• **id?**: `string`

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

#### Implementation of

`IFederatedCatalogue.queryParticipants`

#### Throws

NotImplementedError if the implementation does not support retrieval.

***

### registerServiceDescriptionCredential()

> **registerServiceDescriptionCredential**(`credentialJwt`): `Promise`\<`void`\>

Registers a compliance Credential to the service.

#### Parameters

• **credentialJwt**: `string`

The credential (wrapped into a presentation) as JWT.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IFederatedCatalogue.registerServiceDescriptionCredential`

***

### queryServiceDescriptions()

> **queryServiceDescriptions**(`providedBy`?, `cursor`?, `pageSize`?): `Promise`\<`object`\>

Query the federated catalogue.

#### Parameters

• **providedBy?**: `string`

The identity of the participant.

• **cursor?**: `string`

The cursor to request the next page of entities.

• **pageSize?**: `number`

The maximum number of entities in a page.

#### Returns

`Promise`\<`object`\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

##### entities

> **entities**: `IServiceDescriptionEntry`[]

The entities, which can be partial if a limited keys list was provided.

##### cursor?

> `optional` **cursor**: `string`

An optional cursor, when defined can be used to call find to get more entities.

#### Implementation of

`IFederatedCatalogue.queryServiceDescriptions`

#### Throws

NotImplementedError if the implementation does not support retrieval.

***

### extractParticipantEntry()

> `private` **extractParticipantEntry**(`participantId`, `complianceCredential`, `credentials`): `IParticipantEntry`

Extracts participant entry from the credentials.

#### Parameters

• **participantId**: `string`

Participant Id.

• **complianceCredential**: `IComplianceCredential`

Compliance credential

• **credentials**: `IVerifiableCredential`[]

The Credentials extracted.

#### Returns

`IParticipantEntry`

Participant Entry to be saved on the Database.

***

### extractServiceDescriptionEntry()

> `private` **extractServiceDescriptionEntry**(`sdCredential`, `dataResourceCredentials`): `IServiceDescriptionEntry`

Extracts service description entry from the credentials.

#### Parameters

• **sdCredential**: `IServiceDescriptionCredential`

SD credential.

• **dataResourceCredentials**: `IDataResourceCredential`[]

Data Resource credential.

#### Returns

`IServiceDescriptionEntry`

Service Description Entry to be saved on the Database.

***

### extractDataResourceEntry()

> `private` **extractDataResourceEntry**(`dataResourceCredential`): `IDataResourceEntry`

Extracts data resource entry from the credentials.

#### Parameters

• **dataResourceCredential**: `IDataResourceCredential`

Data Resource credential.

#### Returns

`IDataResourceEntry`

DataResource Entry to be saved on the Database.

***

### checkParticipantExists()

> `private` **checkParticipantExists**(`participantId`): `Promise`\<`void`\>

#### Parameters

• **participantId**: `string`

#### Returns

`Promise`\<`void`\>
