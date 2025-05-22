// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDataResourceEntry } from "./data-resource/IDataResourceEntry";
import type { IDataSpaceConnectorEntry } from "./data-space-connector/IDataSpaceConnectorEntry";
import type { IParticipantEntry } from "./participant/IParticipantEntry";
import type { IServiceOfferingEntry } from "./service-offering/IServiceOfferingEntry";

/**
 * Catalogue entry base fields.
 */
export type ICatalogueEntry =
	| IParticipantEntry
	| IDataSpaceConnectorEntry
	| IServiceOfferingEntry
	| IDataResourceEntry;
