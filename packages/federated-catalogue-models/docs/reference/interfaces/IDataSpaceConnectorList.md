# Interface: IDataSpaceConnectorList

Interface describing a list of Data Space Connectors.

## Properties

### @context

> **@context**: [`FederatedCatalogueContextType`](../type-aliases/FederatedCatalogueContextType.md)

The LD Context.

***

### type

> **type**: `"ItemList"`

The type

***

### itemListElement

> **itemListElement**: `Omit`\<[`IDataSpaceConnectorEntry`](IDataSpaceConnectorEntry.md), `"@context"`\>[]

The components of the Collection

***

### nextItem?

> `optional` **nextItem**: `string`

Next item cursor.
