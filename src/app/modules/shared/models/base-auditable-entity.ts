import { BaseEntity } from "./base-entity";

export interface BaseAuditableEntity extends BaseEntity {
    created: Date;
    createdBy: string;
    lastModified?: Date;
    lastModifiedBy?: string;
}
