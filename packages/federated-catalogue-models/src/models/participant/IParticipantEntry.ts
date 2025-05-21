// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IParticipant } from "@twin.org/standards-gaia-x";
import type { FederatedCatalogueContextType } from "../federatedCatalogueContextType";
import type { ICatalogueBase } from "../ICatalogueBase";

/**
 * Interface describing a participant.
 */
export interface IParticipantEntry extends IParticipant, ICatalogueBase {
	/**
	 * The LD Context
	 */
	"@context": FederatedCatalogueContextType;
}
