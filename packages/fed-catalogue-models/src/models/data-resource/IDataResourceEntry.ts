// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IDataResource } from "../../gaia-x/IDataResource";
import type { ICatalogEntry } from "../ICatalogEntry";

/**
 * Interface describing a Data Resource entry.
 */
export interface IDataResourceEntry extends ICatalogEntry, IDataResource {}
