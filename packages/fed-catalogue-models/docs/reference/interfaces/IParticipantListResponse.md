# Interface: IParticipantListResponse

Response for log entry list request.

## Properties

### body

> **body**: `object`

The response payload.

#### @context

> **@context**: `string`[]

The LD @context.

#### entities

> **entities**: [`IParticipantEntry`](IParticipantEntry.md)[]

The entities, which can be partial if a limited keys list was provided.

#### cursor?

> `optional` **cursor**: `string`

An optional cursor, when defined can be used to call find to get more entities.
