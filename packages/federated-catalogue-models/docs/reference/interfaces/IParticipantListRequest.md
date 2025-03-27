# Interface: IParticipantListRequest

Get the a list of the participant entries.

## Properties

### query

> **query**: `object`

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

> `optional` **pageSize**: `number`

The maximum number of entities in a page.
