import { EntityStatus } from "src/app/modules/shared/enums/entity-status";

export interface BaseEntity {
    id: number;
    status:EntityStatus
}
