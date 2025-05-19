# Interface: IServiceOfferingEntry

Interface describing a Service Offering.

## Extends

- `ICatalogueEntry`.`IServiceOffering`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `IJsonLdIdMap` \| `IJsonLdNodeObject` \| `IJsonLdListObject` \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdSetObject` \| `IJsonLdJsonObject` \| `IJsonLdIndexMap` \| `IJsonLdLanguageMap` \| `IJsonLdGraphObject` \| `IJsonLdNodeObject`[] \| `IJsonLdJsonObject`[] \| \{[`key`: `string`]: `string`; \} \| `IJsonLdTypeMap` \| `IJsonLdNodePrimitive`[]

## Properties

### issuer

> **issuer**: `string`

The trusted issuer of the compliance credential

#### Inherited from

`ICatalogueEntry.issuer`

***

### validFrom

> **validFrom**: `string`

Valid from (as per W3C VC Data Model v2)

#### Inherited from

`ICatalogueEntry.validFrom`

***

### validUntil

> **validUntil**: `string`

Valid until (as per W3C VC Data Model v2)

#### Inherited from

`ICatalogueEntry.validUntil`

***

### dateCreated

> **dateCreated**: `string`

The creation date.

#### Inherited from

`ICatalogueEntry.dateCreated`

***

### evidence

> **evidence**: `string`[]

The evidences concerning the data resource.

#### Inherited from

`ICatalogueEntry.evidence`

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

***

### id

> **id**: `string`

Id

#### Inherited from

`IServiceOffering.id`

***

### type

> **type**: `"ServiceOffering"`

Type

#### Inherited from

`IServiceOffering.type`

***

### description?

> `optional` **description**: `string`

Description

#### Inherited from

`IServiceOffering.description`

***

### name

> **name**: `string`

Name

#### Inherited from

`IServiceOffering.name`

***

### endpoint

> **endpoint**: `IEndpoint`

The endpoint

#### Inherited from

`IServiceOffering.endpoint`
