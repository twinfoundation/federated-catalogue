# Interface: IServiceOfferingEntry

Interface describing a SD.

## Extends

- `ICatalogueEntry`.`IServiceOffering`

## Indexable

\[`key`: `string`\]: `undefined` \| `null` \| `string` \| `number` \| `boolean` \| `string`[] \| `IJsonLdContextDefinition` \| `IJsonLdContextDefinitionElement`[] \| `IJsonLdIdMap` \| `IJsonLdNodeObject` \| `IJsonLdListObject` \| `object` & `object` \| `object` & `object` \| `object` & `object` \| `IJsonLdSetObject` \| `IJsonLdJsonObject` \| `IJsonLdIndexMap` \| `IJsonLdLanguageMap` \| `IJsonLdGraphObject` \| `IJsonLdNodeObject`[] \| `IJsonLdJsonObject`[] \| \{\} \| `IJsonLdTypeMap` \| `IJsonLdNodePrimitive`[]

## Properties

### trustedIssuerId

> **trustedIssuerId**: `string`

The trusted issuer of the compliance credential

#### Inherited from

`ICatalogueEntry.trustedIssuerId`

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

### evidences

> **evidences**: `string`[]

The evidences concerning the data resource.

#### Inherited from

`ICatalogueEntry.evidences`

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
