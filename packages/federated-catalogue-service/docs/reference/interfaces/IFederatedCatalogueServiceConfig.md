# Interface: IFederatedCatalogueServiceConfig

Federated Catalogue service configuration

## Properties

### subResourceCacheTtlMs?

> `optional` **subResourceCacheTtlMs**: `number`

The number of ms that sub-resources can live in the fetch cache.
0 means they can live forever.
undefined means they are never cached.

***

### clearingHouseApproverList

> **clearingHouseApproverList**: `string`[]

Clearing House approver list
