import { Component } from '@angular/core';
import { TodoList } from '../../models/todo-list';
import { CreateTodoItemCommand } from '../../commands/create-todo-item-command';
import { TodoItemService } from '../../services/todo-item.service';

@Component({
  selector: 'app-todo-app-layout',
  templateUrl: './todo-app-layout.component.html',
  styleUrls: ['./todo-app-layout.component.css']
})
export class TodoAppLayoutComponent {
  selectedTodoList: TodoList | null = null;

  constructor(private todoItemService: TodoItemService) {}

  handleTodoItemCreated(todoItem: CreateTodoItemCommand) {
    if (this.selectedTodoList) {
      todoItem.listId = this.selectedTodoList.id;
      this.todoItemService.createTodoItem(todoItem).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Todo item created successfully:', response.message);
          }
        }
      });
    }
  }
}
