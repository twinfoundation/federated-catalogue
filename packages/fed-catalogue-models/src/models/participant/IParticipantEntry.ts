// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IParticipant } from "../../gaia-x/IParticipant";
import type { ICatalogEntry } from "../ICatalogEntry";

/**
 * Interface describing a participant.
 */
export interface IParticipantEntry extends IParticipant, ICatalogEntry {}
