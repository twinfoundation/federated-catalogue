// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { IParticipant } from "./IParticipant";
import { ICatalogEntry } from "../ICatalogEntry";

/**
 * Interface describing a participant.
 */
export interface IParticipantEntry extends IParticipant, ICatalogEntry {}
