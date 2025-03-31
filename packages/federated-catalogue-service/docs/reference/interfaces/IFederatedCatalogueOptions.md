# Interface: IFederatedCatalogueOptions

Federated Catalogue service options

## Properties

### subResourceCacheTtlMs?

> `optional` **subResourceCacheTtlMs**: `number`

The number of ms that sub-resources can live in the fetch cache.
0 means they can live forever.
undefined means they are never cached.

***

### loggingConnectorType?

> `optional` **loggingConnectorType**: `string`

Logging connector type

***

### clearingHouseApproverList

> **clearingHouseApproverList**: `string`[]

Clearing House approver list
