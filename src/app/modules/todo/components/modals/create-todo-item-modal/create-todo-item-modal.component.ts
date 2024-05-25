import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateTodoItemCommand } from '../../../commands/create-todo-item-command';
import { TodoList } from '../../../models/todo-list';
import { PriorityEnum } from 'src/app/modules/shared/enums/priority-enum';
import { TodoItemService } from '../../../services/todo-item.service';

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
  note: string = '';
  priority: PriorityEnum = PriorityEnum.None;

  PriorityEnum = PriorityEnum;

  constructor(private todoItemService: TodoItemService) {}

  createTodoItem() {
    if (this.todoList) {
      const newTodoItem: CreateTodoItemCommand = {
        title: this.title,
        isCompleted: this.isCompleted,
        backgroundColor: this.backgroundColor,
        tags: this.tags.split(',').map(tag => tag.trim()),
        listId: this.todoList.id,
        note: this.note,
        priority: Number(this.priority) 
      };

      console.log(newTodoItem)
      this.todoItemService.createTodoItem(newTodoItem).subscribe({
        next: (response) => {
          console.log('Todo item created successfully:', response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating todo item:', error);
          // Detaylı hata mesajı
          if (error.error) {
            console.error('Server Error:', error.error);
          }
        }
      });
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
