# Interface: IServiceOfferingListRequest

Get the a list of the service offering entries.

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

### query

> **query**: `object`

The query parameters.

#### id?

> `optional` **id**: `string`

The Service Offering Id.

#### providedBy?

> `optional` **providedBy**: `string`

The service provider.

#### cursor?

> `optional` **cursor**: `string`

The optional cursor to get next chunk.

#### pageSize?

> `optional` **pageSize**: `number`

The maximum number of entities in a page.
