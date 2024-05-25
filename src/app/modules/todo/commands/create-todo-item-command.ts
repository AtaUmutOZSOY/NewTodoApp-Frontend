import { PriorityEnum } from "../../shared/enums/priority-enum";

export interface CreateTodoItemCommand {
  title: string;                                              
  isCompleted: boolean;
  backgroundColor: string;
  tags: string[];
  listId: number;
  note?: string;
  priority: PriorityEnum;
}


