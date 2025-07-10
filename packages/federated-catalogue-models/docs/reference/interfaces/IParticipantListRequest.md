# Interface: IParticipantListRequest

Get the a list of the participant entries.

## Extends

- [`IFederatedCatalogueGetRequest`](IFederatedCatalogueGetRequest.md)

## Properties

### headers?

> `optional` **headers**: `object`

The headers which can be used to determine the response data type.

#### accept

> **accept**: `"application/json"` \| `"application/ld+json"`

#### Inherited from

[`IFederatedCatalogueGetRequest`](IFederatedCatalogueGetRequest.md).[`headers`](IFederatedCatalogueGetRequest.md#headers)

***

### query?

> `optional` **query**: `object`

The query parameters.

#### id?

> `optional` **id**: `string`

The participant Id.

#### registrationNumber?

> `optional` **registrationNumber**: `string`

The legal registration number.

#### lrnType?

> `optional` **lrnType**: `string`

The legal registration number type.

#### cursor?

> `optional` **cursor**: `string`

The optional cursor to get next chunk.

#### pageSize?

> `optional` **pageSize**: `string` \| `number`

The maximum number of entities in a page.
