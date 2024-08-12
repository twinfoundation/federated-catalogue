// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRouteEntryPoint } from "@gtsc/api-models";
import { generateRestRoutesLogging, tagsLogging } from "./loggingRoutes";

export const restEntryPoints: IRestRouteEntryPoint[] = [
	{
		name: "logging",
		defaultBaseRoute: "logging",
		tags: tagsLogging,
		generateRoutes: generateRestRoutesLogging
	}
];
