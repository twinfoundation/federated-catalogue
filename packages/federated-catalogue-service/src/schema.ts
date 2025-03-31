// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { EntitySchemaFactory, EntitySchemaHelper } from "@twin.org/entity";
import { nameof } from "@twin.org/nameof";
import { DataResourceEntry } from "./entities/dataResourceEntry";
import { DataSpaceConnectorEntry } from "./entities/dataSpaceConnectorEntry";
import { ParticipantEntry } from "./entities/participantEntry";
import { ServiceOfferingEntry } from "./entities/serviceOfferingEntry";

/**
 * Inits schemas.
 */
export function initSchema(): void {
	EntitySchemaFactory.register(nameof<ParticipantEntry>(), () =>
		EntitySchemaHelper.getSchema(ParticipantEntry)
	);

	EntitySchemaFactory.register(nameof<DataResourceEntry>(), () =>
		EntitySchemaHelper.getSchema(DataResourceEntry)
	);

	EntitySchemaFactory.register(nameof<ServiceOfferingEntry>(), () =>
		EntitySchemaHelper.getSchema(ServiceOfferingEntry)
	);

	EntitySchemaFactory.register(nameof<DataSpaceConnectorEntry>(), () =>
		EntitySchemaHelper.getSchema(DataSpaceConnectorEntry)
	);
}
