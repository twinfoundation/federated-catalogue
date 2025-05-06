// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { DublinCoreContexts, DublinCoreClasses } from "@twin.org/standards-dublin-core";
import type { GaiaXContexts } from "@twin.org/standards-gaia-x";
import type { SchemaOrgContexts } from "@twin.org/standards-schema-org";
import type { DidContexts } from "@twin.org/standards-w3c-did";
import type { IParticipantEntry } from "./IParticipantEntry";

/**
 * Interface describing a participant entry list.
 */
export interface IParticipantList {
	/**
	 * The LD Context.
	 */
	"@context": [
		typeof GaiaXContexts.GaiaXLdContext,
		typeof SchemaOrgContexts.ContextRoot,
		typeof DublinCoreContexts.ContextTerms,
		typeof DublinCoreContexts.ContextDcmiType,
		typeof DidContexts.ContextVCv2
	];

	/**
	 * The type
	 */
	type: typeof DublinCoreClasses.Collection;

	/**
	 * The components of the Collection
	 *
	 */
	hasPart: Omit<IParticipantEntry, "@context">[];
}
