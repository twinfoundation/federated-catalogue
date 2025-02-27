# Class: FederatedCatalogueService

Service for performing logging operations to a connector.

## Implements

- `IFederatedCatalogue`

## Constructors

### new FederatedCatalogueService()

> **new FederatedCatalogueService**(`options`): [`FederatedCatalogueService`](FederatedCatalogueService.md)

Create a new instance of FederatedCatalogue service.

#### Parameters

##### options

The options for the connector.

###### loggingConnectorType?

`string`

The type of the logging connector to use, defaults to "logging".

###### entityStorageConnectorName?

`string`

The name of the Entity Connector, defaults to "participant-entry".

###### didResolverEndpoint

`string`

The DIF Universal Resolver endpoint.

#### Returns

[`FederatedCatalogueService`](FederatedCatalogueService.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IFederatedCatalogue.CLASS_NAME`

## Methods

### registerComplianceCredential()

> **registerComplianceCredential**(`credentialJwt`): `Promise`\<`void`\>

Registers a compliance Credential to the service.

#### Parameters

##### credentialJwt

`string`

The credential (wrapped into a presentation) as JWT.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IFederatedCatalogue.registerComplianceCredential`

***

### queryParticipants()

> **queryParticipants**(`id`?, `legalRegistrationNumber`?, `lrnType`?, `cursor`?, `pageSize`?): `Promise`\<\{ `entities`: `IParticipantEntry`[]; `cursor`: `string`; \}\>

Query the federated catalogue.

#### Parameters

##### id?

`string`

The identity of the participant.

##### legalRegistrationNumber?

`string`

The legal registration number.

##### lrnType?

`string`

The legal registration number type (EORI, VATID, GLEIF, KENYA_PIN, etc.)

##### cursor?

`string`

The cursor to request the next page of entities.

##### pageSize?

`number`

The maximum number of entities in a page.

#### Returns

`Promise`\<\{ `entities`: `IParticipantEntry`[]; `cursor`: `string`; \}\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

#### Implementation of

`IFederatedCatalogue.queryParticipants`

***

### registerDataSpaceConnectorCredential()

> **registerDataSpaceConnectorCredential**(`credentialJwt`): `Promise`\<`void`\>

Registers a compliance Credential concerning a Data Space Connector.

#### Parameters

##### credentialJwt

`string`

The credential (wrapped into a presentation) as JWT.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IFederatedCatalogue.registerDataSpaceConnectorCredential`

***

### queryDataSpaceConnectors()

> **queryDataSpaceConnectors**(`id`?, `maintainer`?, `cursor`?, `pageSize`?): `Promise`\<\{ `entities`: `IDataSpaceConnectorEntry`[]; `cursor`: `string`; \}\>

Query the federated catalogue.

#### Parameters

##### id?

`string`

The identity of the participant.

##### maintainer?

`string`

The DS Connector maintainer.

##### cursor?

`string`

The cursor to request the next page of entities.

##### pageSize?

`number`

The maximum number of entities in a page.

#### Returns

`Promise`\<\{ `entities`: `IDataSpaceConnectorEntry`[]; `cursor`: `string`; \}\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

#### Implementation of

`IFederatedCatalogue.queryDataSpaceConnectors`

***

### registerServiceOfferingCredential()

> **registerServiceOfferingCredential**(`credentialJwt`): `Promise`\<`void`\>

Registers a Service Offering Credential.

#### Parameters

##### credentialJwt

`string`

The credential (wrapped into a presentation) as JWT.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IFederatedCatalogue.registerServiceOfferingCredential`

***

### queryServiceOfferings()

> **queryServiceOfferings**(`id`?, `providedBy`?, `cursor`?, `pageSize`?): `Promise`\<\{ `entities`: `IServiceOfferingEntry`[]; `cursor`: `string`; \}\>

Query the federated catalogue.

#### Parameters

##### id?

`string`

Service Id.

##### providedBy?

`string`

The identity of the participant.

##### cursor?

`string`

The cursor to request the next page of entities.

##### pageSize?

`number`

The maximum number of entities in a page.

#### Returns

`Promise`\<\{ `entities`: `IServiceOfferingEntry`[]; `cursor`: `string`; \}\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

#### Implementation of

`IFederatedCatalogue.queryServiceOfferings`

***

### queryDataResources()

> **queryDataResources**(`id`?, `producedBy`?, `cursor`?, `pageSize`?): `Promise`\<\{ `entities`: `IDataResourceEntry`[]; `cursor`: `string`; \}\>

Query the federated catalogue.

#### Parameters

##### id?

`string`

The identity of the DataResource.

##### producedBy?

`string`

The identity of the participant.

##### cursor?

`string`

The cursor to request the next page of entities.

##### pageSize?

`number`

The maximum number of entities in a page.

#### Returns

`Promise`\<\{ `entities`: `IDataResourceEntry`[]; `cursor`: `string`; \}\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

#### Implementation of

`IFederatedCatalogue.queryDataResources`
