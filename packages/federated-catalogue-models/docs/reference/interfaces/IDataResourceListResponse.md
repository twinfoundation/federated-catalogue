# Interface: IDataResourceListResponse

Response fo data resource list.

## Properties

### body

> **body**: `object`

The response payload.

#### entities

> **entities**: [`IDataResourceList`](IDataResourceList.md)

The list of Data Resources.

#### cursor?

> `optional` **cursor**: `string`

An optional cursor, when defined can be used to call find to get more entities.
