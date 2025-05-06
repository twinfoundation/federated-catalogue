# Interface: IDataSpaceConnectorList

Interface describing a list of Data Space Connectors.

## Properties

### @context

> **@context**: \[`"https://w3id.org/gaia-x/development"`, `"https://schema.org"`, `"http://purl.org/dc/terms/"`, `"http://purl.org/dc/dcmitype/"`, `"https://www.w3.org/ns/credentials/v2"`, `"https://schema.twindev.org/federated-catalogue/types.jsonld"`\]

The LD Context.

***

### type

> **type**: `"Collection"`

The type

***

### hasPart

> **hasPart**: `Omit`\<[`IDataSpaceConnectorEntry`](IDataSpaceConnectorEntry.md), `"@context"`\>[]

The components of the Collection
