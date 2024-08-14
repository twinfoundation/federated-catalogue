// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRoute } from "@gtsc/api-models";

import { generateRestRoutesFedCatalogue } from "@gtsc/fed-catalogue-service";
import { FED_CATALOGUE_SERVICE_NAME } from "./services/federatedCatalogue.js";

/**
 * The routes for the application.
 * @returns The routes for the application.
 */
export function buildRoutes(): IRestRoute[] {
	return [...generateRestRoutesFedCatalogue("fed-catalogue", FED_CATALOGUE_SERVICE_NAME)];
}
