import { BaseAuditableEntity } from "../../shared/models/base-auditable-entity";
import { TodoItem } from "./todo-item";

export interface TodoItemTag extends BaseAuditableEntity {
    todoItemId: number;
    tag: string;
}
