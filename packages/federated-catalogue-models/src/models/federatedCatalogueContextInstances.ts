// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { GaiaXContexts } from "@twin.org/standards-gaia-x";
import { SchemaOrgContexts } from "@twin.org/standards-schema-org";
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
		GaiaXContexts.GaiaXLdContext,
		FederatedCatalogueContexts.ContextRoot
	];

	/**
	 * The LD Context of a Catalogue entry.
	 */
	public static DEFAULT_LD_CONTEXT_ENTRY: IParticipantEntry["@context"] =
		this.DEFAULT_LD_CONTEXT_ENTRY_LIST;
}
