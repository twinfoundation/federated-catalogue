# Interface: ICatalogueEntryGetRequest

Get a Catalogue Entry.

## Extends

- [`IFederatedCatalogueGetRequest`](IFederatedCatalogueGetRequest.md)

## Properties

### pathParams

> **pathParams**: `object`

The parameters from the path.

#### id

> **id**: `string`

The ID of the entry (Participant, Service, etc.) to get.

***

### headers?

> `optional` **headers**: `object`

The headers which can be used to determine the response data type.

#### accept

> **accept**: `"application/json"` \| `"application/ld+json"`

#### Inherited from

[`IFederatedCatalogueGetRequest`](IFederatedCatalogueGetRequest.md).[`headers`](IFederatedCatalogueGetRequest.md#headers)
