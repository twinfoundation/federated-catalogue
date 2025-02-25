# Interface: IFederatedCatalogue

Interface describing a Fed Catalogue Contract.

## Extends

- `IComponent`

## Methods

### registerComplianceCredential()

> **registerComplianceCredential**(`credential`): `Promise`\<`void`\>

Registers a compliance Credential to the service.

#### Parameters

##### credential

`string`

The credential as JWT.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### queryParticipants()

> **queryParticipants**(`participant`?, `legalRegistrationNumber`?, `lrnType`?, `cursor`?, `pageSize`?): `Promise`\<\{ `entities`: [`IParticipantEntry`](IParticipantEntry.md)[]; `cursor`: `string`; \}\>

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

The legal registration number type (EORI, VATID, GLEIF, KENYA_PIN, etc.)

##### cursor?

`string`

The cursor to request the next page of entities.

##### pageSize?

`number`

The maximum number of entities in a page.

#### Returns

`Promise`\<\{ `entities`: [`IParticipantEntry`](IParticipantEntry.md)[]; `cursor`: `string`; \}\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

***

### registerServiceOfferingCredential()

> **registerServiceOfferingCredential**(`credential`): `Promise`\<`void`\>

Registers a service description Credential to the service.

#### Parameters

##### credential

`string`

The credential as JWT.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### queryServiceOfferings()

> **queryServiceOfferings**(`id`?, `providedBy`?, `cursor`?, `pageSize`?): `Promise`\<\{ `entities`: [`IServiceOfferingEntry`](IServiceOfferingEntry.md)[]; `cursor`: `string`; \}\>

Query the federated catalogue.

#### Parameters

##### id?

`string`

Service id.

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

`Promise`\<\{ `entities`: [`IServiceOfferingEntry`](IServiceOfferingEntry.md)[]; `cursor`: `string`; \}\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.

***

### queryDataResourceDescriptions()

> **queryDataResourceDescriptions**(`id`?, `producedBy`?, `cursor`?, `pageSize`?): `Promise`\<\{ `entities`: [`IDataResourceEntry`](IDataResourceEntry.md)[]; `cursor`: `string`; \}\>

Query the federated catalogue.

#### Parameters

##### id?

`string`

The identity of the participant.

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

`Promise`\<\{ `entities`: [`IDataResourceEntry`](IDataResourceEntry.md)[]; `cursor`: `string`; \}\>

All the entities for the storage matching the conditions,
and a cursor which can be used to request more entities.

#### Throws

NotImplementedError if the implementation does not support retrieval.
