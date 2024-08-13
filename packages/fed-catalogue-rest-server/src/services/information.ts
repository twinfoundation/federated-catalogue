// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import type { IServerInfo } from "@gtsc/api-models";
import { InformationService } from "@gtsc/api-service";
import { I18n } from "@gtsc/core";
import { ServiceFactory, type IService } from "@gtsc/services";
import { systemLogInfo } from "./logging.js";
import type { IOptions } from "../models/IOptions.js";

export const INFORMATION_SERVICE_NAME = "information";

/**
 * Initialise the information service.
 * @param options The options for the web server.
 * @param services The services.
 * @param serverInfo The server information.
 */
export function initialiseInformationService(
	options: IOptions,
	services: IService[],
	serverInfo: IServerInfo
): void {
	systemLogInfo(I18n.formatMessage("apiServer.configuring", { element: "Information Service" }));

	const specFile = path.resolve(
		path.join(options.rootPackageFolder, "docs", "open-api", "spec.json")
	);

	const informationService = new InformationService(serverInfo, specFile);
	services.push(informationService);
	ServiceFactory.register(INFORMATION_SERVICE_NAME, () => informationService);
}
