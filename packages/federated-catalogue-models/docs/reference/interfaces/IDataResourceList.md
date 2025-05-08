# Interface: IDataResourceList

Interface describing a list of Data Resource entries.

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

> **itemListElement**: `Omit`\<[`IDataResourceEntry`](IDataResourceEntry.md), `"@context"`\>[]

The components of the Collection

***

### nextItem?

> `optional` **nextItem**: `string`

Next item cursor.
