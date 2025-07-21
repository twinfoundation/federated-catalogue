# Class: FederatedCatalogueService

Service for performing logging operations to a connector.

## Implements

- `IFederatedCatalogueComponent`

## Constructors

### Constructor

> **new FederatedCatalogueService**(`options`): `FederatedCatalogueService`

Create a new instance of FederatedCatalogue service.

#### Parameters

##### options

[`IFederatedCatalogueServiceConstructorOptions`](../interfaces/IFederatedCatalogueServiceConstructorOptions.md)

The options for the connector.

#### Returns

`FederatedCatalogueService`

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IFederatedCatalogueComponent.CLASS_NAME`

## Methods

### registerComplianceCredential()

> **registerComplianceCredential**(`credentialJwt`): `Promise`\<`string`\>

Registers a Participant's compliance Credential.

#### Parameters

##### credentialJwt

`string`

The credential (wrapped into a presentation) as JWT.

#### Returns

`Promise`\<`string`\>

The Id of the Participant (DID usually).

#### Implementation of

`IFederatedCatalogueComponent.registerComplianceCredential`

***

### queryParticipants()

> **queryParticipants**(`id?`, `legalRegistrationNumber?`, `lrnType?`, `cursor?`, `pageSize?`): `Promise`\<`IParticipantList`\>

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

`Promise`\<`IParticipantList`\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

#### Implementation of

`IFederatedCatalogueComponent.queryParticipants`

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

***

### registerDataSpaceConnectorCredential()

> **registerDataSpaceConnectorCredential**(`credentialJwt`): `Promise`\<`string`\>

Registers a compliance Credential concerning a Data Space Connector.

#### Parameters

##### credentialJwt

`string`

The credential (wrapped into a presentation) as JWT.

#### Returns

`Promise`\<`string`\>

The identifier of the Data Space Connector registered.

#### Implementation of

`IFederatedCatalogueComponent.registerDataSpaceConnectorCredential`

***

### registerDataResourceCredential()

> **registerDataResourceCredential**(`credentialJwt`): `Promise`\<`string`[]\>

Registers a data resource Credential concerning a Data Space Connector.

#### Parameters

##### credentialJwt

`string`

The credential (wrapped into a presentation) as JWT.

#### Returns

`Promise`\<`string`[]\>

The list of Data Resources created.

#### Implementation of

`IFederatedCatalogueComponent.registerDataResourceCredential`

***

### queryDataSpaceConnectors()

> **queryDataSpaceConnectors**(`id?`, `maintainer?`, `cursor?`, `pageSize?`): `Promise`\<`IDataSpaceConnectorList`\>

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

`Promise`\<`IDataSpaceConnectorList`\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

#### Implementation of

`IFederatedCatalogueComponent.queryDataSpaceConnectors`

***

### registerServiceOfferingCredential()

> **registerServiceOfferingCredential**(`credentialJwt`): `Promise`\<`string`[]\>

Registers a Service Offering Credential.

#### Parameters

##### credentialJwt

`string`

The credential (wrapped into a presentation) as JWT.

#### Returns

`Promise`\<`string`[]\>

Nothing.

#### Implementation of

`IFederatedCatalogueComponent.registerServiceOfferingCredential`

***

### queryServiceOfferings()

> **queryServiceOfferings**(`id?`, `providedBy?`, `cursor?`, `pageSize?`): `Promise`\<`IServiceOfferingList`\>

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

`Promise`\<`IDataResourceList`\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

#### Implementation of

`IFederatedCatalogueComponent.queryDataResources`
