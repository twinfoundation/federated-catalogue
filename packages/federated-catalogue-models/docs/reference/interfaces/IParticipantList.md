# Interface: IParticipantList

Interface describing a participant entry list.

## Properties

### @context

> **@context**: \[`"https://schema.org"`, `"http://purl.org/dc/terms/"`, `"https://w3id.org/gaia-x/development"`, `"https://www.w3.org/ns/credentials/v2"`\]

The LD Context.

***

### type

> **type**: `"Collection"`

The type

***

### hasPart

> **hasPart**: `Omit`\<[`IParticipantEntry`](IParticipantEntry.md), `"@context"`\>[]

The components of the Collection
