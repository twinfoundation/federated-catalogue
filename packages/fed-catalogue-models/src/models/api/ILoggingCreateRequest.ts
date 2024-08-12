// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ILogEntry } from "../ILogEntry";

/**
 * Create a new log entry.
 */
export interface ILoggingCreateRequest {
	/**
	 * The data to be used in the create.
	 */
	body: ILogEntry;
}
