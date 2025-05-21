# Interface: IDataResourceEntry

Interface describing a Data Resource entry.

## Extends

- `ICatalogueBase`.`IDataResource`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `IJsonLdIdMap` \| `IJsonLdNodeObject` \| `IJsonLdListObject` \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdSetObject` \| `IJsonLdJsonObject` \| `IJsonLdIndexMap` \| `IJsonLdLanguageMap` \| `IJsonLdGraphObject` \| `IJsonLdNodeObject`[] \| `IJsonLdJsonObject`[] \| \{[`key`: `string`]: `string`; \} \| `IJsonLdTypeMap` \| `IJsonLdNodePrimitive`[]

## Properties

### issuer

> **issuer**: `string`

The trusted issuer of the compliance credential

#### Inherited from

`ICatalogueBase.issuer`

***

### validFrom

> **validFrom**: `string`

Valid from (as per W3C VC Data Model v2)

#### Inherited from

`ICatalogueBase.validFrom`

***

### validUntil

> **validUntil**: `string`

Valid until (as per W3C VC Data Model v2)

#### Inherited from

`ICatalogueBase.validUntil`

***

### dateCreated

> **dateCreated**: `string`

The creation date.

#### Inherited from

`ICatalogueBase.dateCreated`

***

### evidence

> **evidence**: `string`[]

The evidences concerning the data resource.

#### Inherited from

`ICatalogueBase.evidence`

***

### @context

> **@context**: [`FederatedCatalogueContextType`](../type-aliases/FederatedCatalogueContextType.md)

The LD Context

#### Overrides

`IDataResource.@context`

***

### producedBy

> **producedBy**: `string`

Overwriting producedBy as we only store the identifier

#### Overrides

`IDataResource.producedBy`

***

### copyrightOwnedBy

> **copyrightOwnedBy**: `string`

Overwriting copyrightOwnedBy as we only store the identifier

#### Overrides

`IDataResource.copyrightOwnedBy`

***

### exposedThrough

> **exposedThrough**: `string`

Overwriting exposedThrough as we only store the id of the Data Exchange Component

#### Overrides

`IDataResource.exposedThrough`

***

### resourcePolicy

> **resourcePolicy**: `IOdrlPolicy`[]

Overwriting to ensure always an array is stored

#### Overrides

`IDataResource.resourcePolicy`
