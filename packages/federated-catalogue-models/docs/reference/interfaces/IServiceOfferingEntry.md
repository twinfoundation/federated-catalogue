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

> **@context**: \[`"https://w3id.org/gaia-x/development"`, `"https://schema.org"`, `"https://www.w3.org/ns/credentials/v2"`\]

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
