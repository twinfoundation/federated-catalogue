# Interface: IDataSpaceConnectorList

Interface describing a list of Data Space Connectors.

## Properties

### @context

> **@context**: \[`"https://schema.org"`, `"https://www.w3.org/ns/credentials/v2"`, `"https://w3id.org/gaia-x/development"`, `"https://schema.twindev.org/federated-catalogue/types.jsonld"`\]

The LD Context.

***

### type

> **type**: `"StructuredValue"`

The type

***

### itemListElement

> **itemListElement**: `Omit`\<[`IDataSpaceConnectorEntry`](IDataSpaceConnectorEntry.md), `"@context"`\>[]

The components of the Collection

***

### nextItem?

> `optional` **nextItem**: `string`

Next item cursor.
