# Interface: IDataResourceListResponse

Response fo data resource list.

## Properties

### body

> **body**: `object`

The response payload.

#### @context

> **@context**: `"https://w3id.org/gaia-x/development"` \| \[`"https://w3id.org/gaia-x/development"`, `...IJsonLdContextDefinitionElement[]`\]

The LD @context.

#### entities

> **entities**: `Omit`\<[`IDataResourceEntry`](IDataResourceEntry.md), `"@context"`\>[]

The entities, which can be partial if a limited keys list was provided.

#### cursor?

> `optional` **cursor**: `string`

An optional cursor, when defined can be used to call find to get more entities.
