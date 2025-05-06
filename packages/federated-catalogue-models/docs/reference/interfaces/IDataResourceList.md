# Interface: IDataResourceList

Interface describing a list of Data Resource entries.

## Properties

### @context

> **@context**: \[`"https://w3id.org/gaia-x/development"`, `"https://schema.org"`, `"http://purl.org/dc/terms/"`, `"http://purl.org/dc/dcmitype/"`, `"https://www.w3.org/ns/credentials/v2"`\]

The LD Context.

***

### type

> **type**: `"Collection"`

The type

***

### hasPart

> **hasPart**: `Omit`\<[`IDataResourceEntry`](IDataResourceEntry.md), `"@context"`\>[]

The components of the Collection
