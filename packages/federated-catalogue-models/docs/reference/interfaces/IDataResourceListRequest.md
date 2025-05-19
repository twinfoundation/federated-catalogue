# Interface: IDataResourceListRequest

Get the a list of the data resource entries.

## Extends

- [`IFederatedCatalogueGetRequest`](IFederatedCatalogueGetRequest.md)

## Properties

### query

> **query**: `object`

The query parameters.

#### id?

> `optional` **id**: `string`

The Id of the Data Resource.

#### producedBy?

> `optional` **producedBy**: `string`

The service provider.

#### cursor?

> `optional` **cursor**: `string`

The optional cursor to get next chunk.

#### pageSize?

> `optional` **pageSize**: `number`

The maximum number of entities in a page.

***

### headers?

> `optional` **headers**: `object`

The headers which can be used to determine the response data type.

#### accept

> **accept**: `"application/json"` \| `"application/ld+json"`

#### Inherited from

[`IFederatedCatalogueGetRequest`](IFederatedCatalogueGetRequest.md).[`headers`](IFederatedCatalogueGetRequest.md#headers)
