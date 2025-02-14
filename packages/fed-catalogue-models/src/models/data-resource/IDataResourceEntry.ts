// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { IDataResource } from "./IDataResource";
import { ICatalogEntry } from "../ICatalogEntry";

/**
 * Interface describing a Data Resource entry.
 */
export interface IDataResourceEntry extends ICatalogEntry, IDataResource {}
