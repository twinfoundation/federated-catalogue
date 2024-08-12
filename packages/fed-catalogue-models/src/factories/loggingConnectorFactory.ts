// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Factory } from "@gtsc/core";
import type { ILoggingConnector } from "../models/ILoggingConnector";

/**
 * Factory for creating logging connectors.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const LoggingConnectorFactory = Factory.createFactory<ILoggingConnector>("logging");
