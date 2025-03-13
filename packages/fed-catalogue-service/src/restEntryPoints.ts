// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRouteEntryPoint } from "@twin.org/api-models";
import { generateRestRoutesFedCatalogue, tagsFedCatalogue } from "./federatedCatalogueRoutes";

export const restEntryPoints: IRestRouteEntryPoint[] = [
	{
		name: "fedcatalogue",
		defaultBaseRoute: "fedcatalogue",
		tags: tagsFedCatalogue,
		generateRoutes: generateRestRoutesFedCatalogue
	}
];
