import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TodoList } from '../../models/todo-list';
import { CreateTodoItemCommand } from '../../commands/create-todo-item-command';
import { TodoItemService } from '../../services/todo-item.service';
import { TodoItem } from '../../models/todo-item';
import { TodoItemTag } from '../../models/todo-item-tag';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnChanges {
  @Input() todoList: TodoList | null = null;
  todoItems: TodoItem[] = [];

  constructor(private todoItemService: TodoItemService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['todoList'] && this.todoList) {
      this.loadTodoItems();
    } else {
      this.todoItems = [];
    }
  }

  loadTodoItems() {
    debugger
    if (this.todoList) {
      this.todoItemService.getActiveTodoItemsByListId(this.todoList.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.todoItems = response.data;
          }
        }
      });
    } else {
      this.todoItems = [];
    }
  }

  getTagsString(tags: TodoItemTag[]): string {
    return tags.map(tag => tag.tag).join(', ');
  }

  openCreateTodoItemModal() {
    const modal = document.getElementById('createTodoItemModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
  }

  handleTodoItemCreated(todoItem: CreateTodoItemCommand) {
    if (this.todoList) {
      todoItem.listId = this.todoList.id;
      this.todoItemService.createTodoItem(todoItem).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadTodoItems();
          }
        }
      });
      this.closeModal();
    }
  }

  closeModal() {
    const modal = document.getElementById('createTodoItemModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        document.body.removeChild(backdrop);
      }
    }
  }
}
