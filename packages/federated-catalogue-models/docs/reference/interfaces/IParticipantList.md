# Interface: IParticipantList

Interface describing a participant entry list.

## Properties

### @context

> **@context**: \[`"https://schema.org"`, `"https://www.w3.org/ns/credentials/v2"`, `"https://w3id.org/gaia-x/development"`\]

The LD Context.

***

### type

> **type**: `"StructuredValue"`

The type

***

### itemListElement

> **itemListElement**: `Omit`\<[`IParticipantEntry`](IParticipantEntry.md), `"@context"`\>[]

The components of the Collection

***

### nextItem?

> `optional` **nextItem**: `string`

Next item cursor.
