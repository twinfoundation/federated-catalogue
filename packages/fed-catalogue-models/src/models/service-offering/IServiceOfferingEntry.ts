// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { IServiceOffering } from "../../gaia-x/IServiceOffering";
import { ICatalogEntry } from "../ICatalogEntry";

/**
 * Interface describing a SD.
 */
export interface IServiceOfferingEntry extends ICatalogEntry, IServiceOffering {}
