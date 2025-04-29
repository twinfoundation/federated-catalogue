# Interface: IServiceOfferingList

Interface describing a list of Service Offering Entries.

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

> **hasPart**: `Omit`\<[`IServiceOfferingEntry`](IServiceOfferingEntry.md), `"@context"`\>[]

The components of the Collection
