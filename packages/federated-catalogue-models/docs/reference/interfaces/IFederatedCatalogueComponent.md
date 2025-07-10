# Interface: IFederatedCatalogueComponent

Interface describing a Federated Catalogue Contract.

## Extends

- `IComponent`

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

***

### queryParticipants()

> **queryParticipants**(`participant?`, `legalRegistrationNumber?`, `lrnType?`, `cursor?`, `pageSize?`): `Promise`\<[`IParticipantList`](IParticipantList.md)\>

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

`Promise`\<[`IParticipantList`](IParticipantList.md)\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

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

***

### queryDataSpaceConnectors()

> **queryDataSpaceConnectors**(`id?`, `maintainer?`, `cursor?`, `pageSize?`): `Promise`\<[`IDataSpaceConnectorList`](IDataSpaceConnectorList.md)\>

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

`Promise`\<[`IDataSpaceConnectorList`](IDataSpaceConnectorList.md)\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

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

***

### queryServiceOfferings()

> **queryServiceOfferings**(`id?`, `providedBy?`, `cursor?`, `pageSize?`): `Promise`\<[`IServiceOfferingList`](IServiceOfferingList.md)\>

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

`Promise`\<[`IServiceOfferingList`](IServiceOfferingList.md)\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

***

### queryDataResources()

> **queryDataResources**(`id?`, `producedBy?`, `cursor?`, `pageSize?`): `Promise`\<[`IDataResourceList`](IDataResourceList.md)\>

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

`Promise`\<[`IDataResourceList`](IDataResourceList.md)\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

***

### getEntry()

> **getEntry**(`entryType`, `entryId`): `Promise`\<[`ICatalogueEntry`](../type-aliases/ICatalogueEntry.md)\>

Returns a Federated Catalogue entry.

#### Parameters

##### entryType

[`FederatedCatalogueEntryType`](../type-aliases/FederatedCatalogueEntryType.md)

The type of entry.

##### entryId

`string`

The entry's id.

#### Returns

`Promise`\<[`ICatalogueEntry`](../type-aliases/ICatalogueEntry.md)\>

Catalogue Entry

#### Throws

NotFoundError if not found.
