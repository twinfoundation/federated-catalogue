// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { ICatalogEntry } from "../ICatalogEntry";
import type { IDataSpaceConnector } from "./IDataSpaceConnector";

/**
 * Interface describing a participant.
 */
export interface IDataSpaceConnectorEntry extends IDataSpaceConnector, ICatalogEntry {}
