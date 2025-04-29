# Interface: IServiceOfferingListResponse

Response for Service Offering list

## Properties

### body

> **body**: `object`

The response payload.

#### entities

> **entities**: [`IServiceOfferingList`](IServiceOfferingList.md)

The list of service offerings.

#### cursor?

> `optional` **cursor**: `string`

An optional cursor, when defined can be used to call find to get more entities.
