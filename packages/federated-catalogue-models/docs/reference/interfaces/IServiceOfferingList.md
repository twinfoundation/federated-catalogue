# Interface: IServiceOfferingList

Interface describing a list of Service Offering Entries.

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

> **itemListElement**: `Omit`\<[`IServiceOfferingEntry`](IServiceOfferingEntry.md), `"@context"`\>[]

The components of the Collection

***

### nextItem?

> `optional` **nextItem**: `string`

Next item cursor.
