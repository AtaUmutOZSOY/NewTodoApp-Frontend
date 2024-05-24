import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateTodoItemCommand } from '../../../commands/create-todo-item-command';
import { TodoList } from '../../../models/todo-list';

@Component({
  selector: 'app-create-todo-item-modal',
  templateUrl: './create-todo-item-modal.component.html',
  styleUrls: ['./create-todo-item-modal.component.css']
})
export class CreateTodoItemModalComponent {
  @Input() todoList: TodoList | null = null;
  @Output() todoItemCreated = new EventEmitter<CreateTodoItemCommand>();

  title: string = '';
  isCompleted: boolean = false;
  backgroundColor: string = '#ffffff';
  tags: string = '';

  createTodoItem() {
    if (this.todoList) {
      const newTodoItem: CreateTodoItemCommand = {
        title: this.title,
        isCompleted: this.isCompleted,
        backgroundColor: this.backgroundColor,
        tags: this.tags.split(',').map(tag => tag.trim()),
        listId: this.todoList.id
      };

      this.todoItemCreated.emit(newTodoItem);
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
