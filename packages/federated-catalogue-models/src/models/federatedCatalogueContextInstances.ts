// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { GaiaXContexts } from "@twin.org/standards-gaia-x";
import { SchemaOrgContexts } from "@twin.org/standards-schema-org";
import { DidContexts } from "@twin.org/standards-w3c-did";
import type { IDataSpaceConnectorEntry } from "./data-space-connector/IDataSpaceConnectorEntry";
import type { IDataSpaceConnectorList } from "./data-space-connector/IDataSpaceConnectorList";
import { FederatedCatalogueContexts } from "./federatedCatalogueContexts";
import type { IParticipantEntry } from "./participant/IParticipantEntry";
import type { IParticipantList } from "./participant/IParticipantList";

/**
 * The LD context instances concerning the Federated Catalogue.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export abstract class FederatedCatalogueContextInstances {
	/**
	 * The LD Context of a list of Catalogue entries.
	 */
	public static DEFAULT_LD_CONTEXT_ENTRY_LIST: IParticipantList["@context"] = [
		SchemaOrgContexts.ContextRoot,
		DidContexts.ContextVCv2,
		GaiaXContexts.GaiaXLdContext
	];

	/**
	 * The LD Context of a Catalogue entry.
	 */
	public static DEFAULT_LD_CONTEXT_ENTRY: IParticipantEntry["@context"] = [
		GaiaXContexts.GaiaXLdContext,
		SchemaOrgContexts.ContextRoot,
		DidContexts.ContextVCv2
	];

	/**
	 * The LD Context of a DataSpace Connector entry.
	 */
	public static DS_CONNECTOR_LD_CONTEXT_ENTRY: IDataSpaceConnectorEntry["@context"] = [
		GaiaXContexts.GaiaXLdContext,
		SchemaOrgContexts.ContextRoot,
		DidContexts.ContextVCv2,
		FederatedCatalogueContexts.ContextRoot
	];

	/**
	 * The LD Context of a list of DataSpace Connector entries.
	 */
	public static DS_CONNECTOR_LD_CONTEXT_ENTRY_LIST: IDataSpaceConnectorList["@context"] = [
		SchemaOrgContexts.ContextRoot,
		DidContexts.ContextVCv2,
		GaiaXContexts.GaiaXLdContext,
		FederatedCatalogueContexts.ContextRoot
	];
}
