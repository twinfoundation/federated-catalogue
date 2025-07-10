# Interface: IServiceOfferingEntry

Interface describing a Service Offering.

## Extends

- `ICatalogueBase`.`IServiceOffering`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdNodeObject` \| `IJsonLdGraphObject` \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdListObject` \| `IJsonLdSetObject` \| `IJsonLdNodePrimitive`[] \| `IJsonLdLanguageMap` \| `IJsonLdIndexMap` \| `IJsonLdNodeObject`[] \| `IJsonLdIdMap` \| `IJsonLdTypeMap` \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `IJsonLdJsonObject` \| `IJsonLdJsonObject`[] \| \{[`key`: `string`]: `string`; \}

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

`IServiceOffering.@context`

***

### providedBy

> **providedBy**: `string`

Overwrites providedBy as we only store identifier as string

#### Overrides

`IServiceOffering.providedBy`

***

### aggregationOfResources?

> `optional` **aggregationOfResources**: `string`[]

Overwrites aggregationOfResources as we only store identifier as string

#### Overrides

`IServiceOffering.aggregationOfResources`

***

### servicePolicy

> **servicePolicy**: `IOdrlPolicy`[]

The service policy is always stored as an array

#### Overrides

`IServiceOffering.servicePolicy`
