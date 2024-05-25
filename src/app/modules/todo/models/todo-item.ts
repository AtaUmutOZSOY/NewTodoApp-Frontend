import { PriorityEnum } from "../../shared/enums/priority-enum";
import { BaseAuditableEntity } from "../../shared/models/base-auditable-entity";
import { TodoItemTag } from "./todo-item-tag";
import { TodoList } from "./todo-list";

export interface TodoItem extends BaseAuditableEntity{
    title: string;
    isCompleted: boolean;
    backgroundColor: string;
    listId: number;
    list: TodoList;
    priority: PriorityEnum;
    tags: TodoItemTag[];
    note?:string

}
