// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { I18n, Is, StringHelper } from "@gtsc/core";
import type { ILogEntry } from "../models/ILogEntry";

/**
 * Helper class for log entry operations.
 */
export class LogEntryHelper {
	/**
	 * Translate the log entry.
	 * @param logEntry The log entry.
	 * @returns The translated log entry if a translation can be found.
	 */
	public static translate(logEntry: ILogEntry): string | undefined {
		if (Is.stringValue(logEntry.level) && Is.stringValue(logEntry.source)) {
			const sourceMessage = `${logEntry.level}.${StringHelper.camelCase(logEntry.source)}.${logEntry.message}`;
			if (I18n.hasMessage(sourceMessage)) {
				return I18n.formatMessage(
					sourceMessage,
					logEntry.data as {
						[key: string]: unknown;
					}
				);
			}
		}

		if (Is.stringValue(logEntry.source)) {
			const sourceMessage = `${StringHelper.camelCase(logEntry.source)}.${logEntry.message}`;
			if (I18n.hasMessage(sourceMessage)) {
				return I18n.formatMessage(
					sourceMessage,
					logEntry.data as {
						[key: string]: unknown;
					}
				);
			}
		}

		if (I18n.hasMessage(logEntry.message)) {
			return I18n.formatMessage(
				logEntry.message,
				logEntry.data as {
					[key: string]: unknown;
				}
			);
		}
	}
}
