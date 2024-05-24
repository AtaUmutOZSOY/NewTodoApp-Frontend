import { TodoList } from "../models/todo-list";

export interface CreateTodoItemCommand {
  title: string;
  isCompleted: boolean;
  backgroundColor: string;
  tags: string[];
  listId: number;
}
