# Interface: IFederatedCatalogueServiceConstructorOptions

Federated Catalogue service options

## Properties

### identityResolverComponentType?

> `optional` **identityResolverComponentType**: `string`

The identity resolver component used.

***

### loggingConnectorType?

> `optional` **loggingConnectorType**: `string`

Logging connector type

***

### config

> **config**: [`IFederatedCatalogueServiceConfig`](IFederatedCatalogueServiceConfig.md)

The configuration of the Federated Catalogue service.

***

### participantEntityStorageType?

> `optional` **participantEntityStorageType**: `string`

The entity storage for participants.

#### Default

```ts
participant-entry
```

***

### dataResourceEntityStorageType?

> `optional` **dataResourceEntityStorageType**: `string`

The entity storage for data resources.

#### Default

```ts
data-resource-entry
```

***

### serviceOfferingEntityStorageType?

> `optional` **serviceOfferingEntityStorageType**: `string`

The entity storage for service offerings.

#### Default

```ts
service-offering-entry
```

***

### dataSpaceConnectorStorageType?

> `optional` **dataSpaceConnectorStorageType**: `string`

The entity storage for data space connectors.

#### Default

```ts
data-space-connector-entry
```
