# Interface: IParticipantListResponse

Response for participant list query

## Properties

### body

> **body**: `object`

The response payload.

#### entities

> **entities**: [`IParticipantList`](IParticipantList.md)

The entities as a Participant list

#### cursor?

> `optional` **cursor**: `string`

An optional cursor, when defined can be used to call find to get more entities.
