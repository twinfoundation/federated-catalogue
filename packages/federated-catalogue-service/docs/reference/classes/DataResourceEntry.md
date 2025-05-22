# Class: DataResourceEntry

Data Resource Entry.

## Constructors

### Constructor

> **new DataResourceEntry**(): `DataResourceEntry`

#### Returns

`DataResourceEntry`

## Properties

### id

> **id**: `string`

The Id.

***

### issuer

> **issuer**: `string`

The trusted issuer of the compliance credential

***

### name

> **name**: `string`

The name.

***

### description?

> `optional` **description**: `string`

The description.

***

### producedBy

> **producedBy**: `string`

The Id of the producer of the data described by this Data Resource.

***

### copyrightOwnedBy

> **copyrightOwnedBy**: `string`

The copyright owner

***

### license

> **license**: `string`

The license

***

### exposedThrough

> **exposedThrough**: `string`

The data exchange component used to expose the Data Resource.
Only a URL pointing to the resource is stored

***

### resourcePolicy

> **resourcePolicy**: `IOdrlPolicy`[]

The Data Resource policy

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
