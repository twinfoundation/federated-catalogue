// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRouteEntryPoint } from "@gtsc/api-models";
import { generateRestRoutesFedCatalogue, tagsFedCatalogue } from "./fedCatalogueRoutes";

export const restEntryPoints: IRestRouteEntryPoint[] = [
	{
		name: "fedcatalogue",
		defaultBaseRoute: "fedcatalogue",
		tags: tagsFedCatalogue,
		generateRoutes: generateRestRoutesFedCatalogue
	}
];
