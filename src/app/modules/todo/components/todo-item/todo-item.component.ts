import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TodoList } from '../../models/todo-list';
import { CreateTodoItemCommand } from '../../commands/create-todo-item-command';
import { TodoItemService } from '../../services/todo-item.service';
import { TodoItem } from '../../models/todo-item';
import { TodoItemTag } from '../../models/todo-item-tag';
import { PriorityEnum } from 'src/app/modules/shared/enums/priority-enum';
import { TodoItemTagService } from '../../services/todo-item-tag.service';
import { CreateTodoItemTagCommand } from '../../commands/create-todo-item-tag-command';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnChanges {
  @Input() todoList: TodoList | null = null;
  @Output() todoItemCreated = new EventEmitter<CreateTodoItemCommand>();
  todoItems: TodoItem[] = [];
  paginatedItems: TodoItem[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  title: string = '';
  backgroundColor: string = '#ffffff';
  tags: string = '';
  isCompleted: boolean = false;
  note: string = '';

  constructor(private todoItemService: TodoItemService, private todoItemTagService: TodoItemTagService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['todoList'] && this.todoList) {
      this.loadTodoItems();
    } else {
      this.todoItems = [];
    }
  }

  loadTodoItems() {
    if (this.todoList) {
      this.todoItemService.getActiveTodoItemsByListId(this.todoList.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.todoItems = response.data;
            this.loadTagsForTodoItems();
            this.updatePaginatedItems();
          }
        },
        error: (error) => {
          console.error('Error fetching todo items:', error);
        }
      });
    } else {
      this.todoItems = [];
    }
  }

  loadTagsForTodoItems() {
    this.todoItems.forEach(item => {
      this.todoItemTagService.getAllTodoItemTagsByTodoItemId(item.id).subscribe({
        next: (response) => {
          if (response.success) {
            item.tags = response.data;
          }
        },
        error: (error) => {
          console.error('Error fetching tags:', error);
        }
      });
    });
  }

  getTagsString(tags: TodoItemTag[] | null): string {
    if (!tags) {
      return '';
    }
    return tags.map(tag => tag.tag).join(', ');
  }

  getPriorityString(priority: PriorityEnum): string {
    switch (priority) {
      case PriorityEnum.None:
        return 'None';
      case PriorityEnum.Low:
        return 'Low';
      case PriorityEnum.Medium:
        return 'Medium';
      case PriorityEnum.High:
        return 'High';
      default:
        return '';
    }
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

  createTodoItem() {
    const tagsArray: string[] = this.tags.split(',').map(tag => tag.trim());
    const newItem: CreateTodoItemCommand = {
      title: this.title,
      isCompleted: this.isCompleted,
      backgroundColor: this.backgroundColor,
      listId: this.todoList?.id || 0,
      tags: tagsArray,
      note: this.note,
      priority: PriorityEnum.None
    };

    this.todoItemService.createTodoItem(newItem).subscribe({
      next: (response) => {
        if (response.success) {
          this.loadTodoItems();
          this.todoItemCreated.emit(newItem);
          this.closeModal();
        }
      },
      error: (error) => {
        console.error('Error creating todo item:', error);
      }
    });
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

  handleTodoItemCreated(todoItem: CreateTodoItemCommand) {
    this.todoItemCreated.emit(todoItem);
  }

  updatePaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.todoItems.slice(startIndex, endIndex);
  }

  setPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  get totalPages(): number {
    return Math.ceil(this.todoItems.length / this.itemsPerPage);
  }

  addTag(todoItemId: number, tag: string) {
    const createTodoItemTagCommand: CreateTodoItemTagCommand = {
      todoItemId: todoItemId,
      tag: tag
    };
    this.todoItemTagService.createTodoItemTag(createTodoItemTagCommand).subscribe({
      next: (response) => {
        console.log('Tag added successfully:', response);
        this.loadTodoItems();
      },
      error: (error) => {
        console.error('Error adding tag:', error);
      }
    });
  }

  removeTag(tagId: number) {
    this.todoItemTagService.removeTodoItemTag(tagId).subscribe({
      next: (response) => {
        console.log('Tag removed successfully:', response);
        this.loadTodoItems();
      },
      error: (error) => {
        console.error('Error removing tag:', error);
      }
    });
  }
}
