# Class: FederatedCatalogueClient

Client for performing auditable item graph through to REST endpoints.

## Extends

- `BaseRestClient`

## Implements

- `IFederatedCatalogueComponent`

## Constructors

### Constructor

> **new FederatedCatalogueClient**(`config`): `FederatedCatalogueClient`

Create a new instance of AuditableItemGraphClient.

#### Parameters

##### config

`IBaseRestClientConfig`

The configuration for the client.

#### Returns

`FederatedCatalogueClient`

#### Overrides

`BaseRestClient.constructor`

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IFederatedCatalogueComponent.CLASS_NAME`

## Methods

### registerComplianceCredential()

> **registerComplianceCredential**(`credential`): `Promise`\<`string`\>

Registers a Participant's compliance Credential to the service.

#### Parameters

##### credential

`string`

The credential as JWT.

#### Returns

`Promise`\<`string`\>

The participant Id (usually a DID).

#### Implementation of

`IFederatedCatalogueComponent.registerComplianceCredential`

***

### queryParticipants()

> **queryParticipants**(`participant?`, `legalRegistrationNumber?`, `lrnType?`, `cursor?`, `pageSize?`): `Promise`\<`IParticipantList`\>

Query the federated catalogue.

#### Parameters

##### participant?

`string`

The identity of the participant.

##### legalRegistrationNumber?

`string`

The legal registration number.

##### lrnType?

`string`

The legal registration number type (EORI, VATID, GLEIF, Kenya's PIN, etc.)

##### cursor?

`string`

The cursor to request the next page of entities.

##### pageSize?

`number`

The maximum number of entities in a page.

#### Returns

`Promise`\<`IParticipantList`\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

#### Implementation of

`IFederatedCatalogueComponent.queryParticipants`

***

### registerDataSpaceConnectorCredential()

> **registerDataSpaceConnectorCredential**(`credential`): `Promise`\<`string`\>

Registers a Data Space Connector to the service.

#### Parameters

##### credential

`string`

The credential as JWT.

#### Returns

`Promise`\<`string`\>

The Data Space Connector Id registered.

#### Implementation of

`IFederatedCatalogueComponent.registerDataSpaceConnectorCredential`

***

### queryDataSpaceConnectors()

> **queryDataSpaceConnectors**(`id?`, `maintainer?`, `cursor?`, `pageSize?`): `Promise`\<`IDataSpaceConnectorList`\>

Query the federated catalogue.

#### Parameters

##### id?

`string`

Data Space Connector Id.

##### maintainer?

`string`

The identity of the participant maintaining the Data Space Connector.

##### cursor?

`string`

The cursor to request the next page of entities.

##### pageSize?

`number`

The maximum number of entities in a page.

#### Returns

`Promise`\<`IDataSpaceConnectorList`\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

#### Implementation of

`IFederatedCatalogueComponent.queryDataSpaceConnectors`

***

### registerServiceOfferingCredential()

> **registerServiceOfferingCredential**(`credential`): `Promise`\<`string`[]\>

Registers a service offering Credential to the service.

#### Parameters

##### credential

`string`

The credential as JWT.

#### Returns

`Promise`\<`string`[]\>

The Id of the Service Offerings registered.

#### Implementation of

`IFederatedCatalogueComponent.registerServiceOfferingCredential`

***

### registerDataResourceCredential()

> **registerDataResourceCredential**(`credential`): `Promise`\<`string`[]\>

Registers a data resource Credential to the service.

#### Parameters

##### credential

`string`

The credential as JWT.

#### Returns

`Promise`\<`string`[]\>

The Id of the Data Resources registered.

#### Implementation of

`IFederatedCatalogueComponent.registerDataResourceCredential`

***

### queryServiceOfferings()

> **queryServiceOfferings**(`id?`, `providedBy?`, `cursor?`, `pageSize?`): `Promise`\<`IServiceOfferingList`\>

Query the federated catalogue.

#### Parameters

##### id?

`string`

Service Offering id.

##### providedBy?

`string`

The identity of the participant providing the Offering.

##### cursor?

`string`

The cursor to request the next page of entities.

##### pageSize?

`number`

The maximum number of entities in a page.

#### Returns

`Promise`\<`IServiceOfferingList`\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

#### Implementation of

`IFederatedCatalogueComponent.queryServiceOfferings`

***

### queryDataResources()

> **queryDataResources**(`id?`, `producedBy?`, `cursor?`, `pageSize?`): `Promise`\<`IDataResourceList`\>

Query the federated catalogue.

#### Parameters

##### id?

`string`

The id of the Data Resource.

##### producedBy?

`string`

The identity of the participant producing the data behind the data resource.

##### cursor?

`string`

The cursor to request the next page of entities.

##### pageSize?

`number`

The maximum number of entities in a page.

#### Returns

`Promise`\<`IDataResourceList`\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

#### Implementation of

`IFederatedCatalogueComponent.queryDataResources`

***

### getEntry()

> **getEntry**(`entryType`, `entryId`): `Promise`\<`ICatalogueEntry`\>

Returns a Federated Catalogue entry.

#### Parameters

##### entryType

`FederatedCatalogueEntryType`

The type of entry.

##### entryId

`string`

The entry's id.

#### Returns

`Promise`\<`ICatalogueEntry`\>

Catalogue Entry

#### Throws

NotFoundError if not found.

#### Implementation of

`IFederatedCatalogueComponent.getEntry`
