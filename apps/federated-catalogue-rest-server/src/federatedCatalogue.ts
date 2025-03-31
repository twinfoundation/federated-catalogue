// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRoute } from "@twin.org/api-models";
import { ComponentFactory, StringHelper } from "@twin.org/core";
import type { IEngineCore, IEngineCoreContext } from "@twin.org/engine-models";
import type { IFederatedCatalogue } from "@twin.org/federated-catalogue-models";
import {
	FederatedCatalogueService,
	generateRestRoutesFederatedCatalogue,
	type IFederatedCatalogueOptions
} from "@twin.org/federated-catalogue-service";
import { nameof } from "@twin.org/nameof";

/**
 * Federated Catalogue initialiser.
 * @param core The engine core.
 * @param context The context for the engine.
 * @param instanceConfig The instance config.
 * @param instanceConfig.options The instance config options.
 * @param overrideInstanceType The instance type to override the default.
 * @returns The name of the instance created.
 */
export function federatedCatalogueTypeInitialiser(
	core: IEngineCore,
	context: IEngineCoreContext,
	instanceConfig: { options: IFederatedCatalogueOptions },
	overrideInstanceType: string
): string {
	const componentName = StringHelper.kebabCase(nameof<IFederatedCatalogue>(), true);
	ComponentFactory.register(
		componentName,
		() => new FederatedCatalogueService(instanceConfig.options)
	);
	return overrideInstanceType ?? componentName;
}

/**
 * Generate the rest routes for the component.
 * @param baseRouteName The base route name.
 * @param componentName The component name.
 * @returns The rest routes.
 */
export function generateRestRoutes(baseRouteName: string, componentName: string): IRestRoute[] {
	return generateRestRoutesFederatedCatalogue(baseRouteName, componentName);
}
