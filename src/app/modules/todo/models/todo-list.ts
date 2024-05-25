import { PriorityEnum } from "../../shared/enums/priority-enum";
import { BaseAuditableEntity } from "../../shared/models/base-auditable-entity";

export interface TodoList extends BaseAuditableEntity {
    priortyLevel:PriorityEnum,
    title:string,

}
