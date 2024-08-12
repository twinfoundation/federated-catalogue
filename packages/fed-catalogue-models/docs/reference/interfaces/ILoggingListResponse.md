# Interface: ILoggingListResponse

Response for log entry list request.

## Properties

### body

> **body**: `object`

The response payload.

#### entities

> **entities**: [`ILogEntry`](ILogEntry.md)[]

The entities, which can be partial if a limited keys list was provided.

#### cursor?

> `optional` **cursor**: `string`

An optional cursor, when defined can be used to call find to get more entities.

#### pageSize?

> `optional` **pageSize**: `number`

Number of entities to return.

#### totalEntities

> **totalEntities**: `number`

Total entities length.
