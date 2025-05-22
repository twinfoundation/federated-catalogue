# Class: ServiceOfferingEntry

Service Offering Entry.

## Constructors

### Constructor

> **new ServiceOfferingEntry**(): `ServiceOfferingEntry`

#### Returns

`ServiceOfferingEntry`

## Properties

### id

> **id**: `string`

The service Id.

***

### issuer

> **issuer**: `string`

The trusted issuer of the compliance credential associated with

***

### name

> **name**: `string`

The service name.

***

### description?

> `optional` **description**: `string`

The service description.

***

### providedBy

> **providedBy**: `string`

The provider Id

***

### endpoint

> **endpoint**: `IEndpoint`

The REST endpoint

***

### servicePolicy

> **servicePolicy**: `IOdrlPolicy`[]

The policy

***

### aggregationOfResources?

> `optional` **aggregationOfResources**: `string`[]

Resources aggregated

***

### validFrom

> **validFrom**: `string`

Valid from

***

### validUntil

> **validUntil**: `string`

Valid to

***

### dateCreated

> **dateCreated**: `string`

Date created

***

### evidence

> **evidence**: `string`[]

Evidences
