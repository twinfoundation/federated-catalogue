// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRoute } from "@gtsc/api-models";

import { generateRestRoutesInformation } from "@gtsc/api-service";
import { generateRestRoutesFedCatalogue } from "@gtsc/fed-catalogue-service";
import { FED_CATALOGUE_SERVICE_NAME } from "./services/federatedCatalogue.js";
import { INFORMATION_SERVICE_NAME } from "./services/information.js";

/**
 * The routes for the application.
 * @returns The routes for the application.
 */
export function buildRoutes(): IRestRoute[] {
	return [
		...generateRestRoutesFedCatalogue("fed-catalogue", FED_CATALOGUE_SERVICE_NAME),
		...generateRestRoutesInformation("", INFORMATION_SERVICE_NAME)
	];
}
