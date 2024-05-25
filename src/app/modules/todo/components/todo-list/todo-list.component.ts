import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoListService } from '../../services/todo-list.service';
import { TodoList } from '../../models/todo-list';
import { EntityStatus } from 'src/app/modules/shared/enums/entity-status';

declare var bootstrap: any;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoLists: TodoList[] = [];
  newTodoListTitle: string = '';
  @Output() selectedTodoList = new EventEmitter<TodoList>();

  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.getAllTodoLists();
  }

  getAllTodoLists() {
    this.todoListService.getAllTodoLists().subscribe({
      next: (response) => {
        if (response.success) {
          this.todoLists = response.data.filter(x => x.status === EntityStatus.Active);
          if (this.todoLists.length > 0) {
            this.selectTodoList(this.todoLists[0]); 
          }
        }
      },
      error: (error) => {
        console.error('Error fetching todo lists:', error);
      }
    });
  }

  selectTodoList(todoList: TodoList) {
    this.selectedTodoList.emit(todoList);
  }

  openCreateTodoListModal() {
    const modal = new bootstrap.Modal(document.getElementById('createTodoListModal'));
    modal.show();
  }

  closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
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

  createTodoList() {
    if (this.newTodoListTitle.trim() === '') {
      return;
    }

    const createTodoListCommand = { title: this.newTodoListTitle };

    this.todoListService.createTodoList(createTodoListCommand).subscribe({
      next: (response) => {
        if (response.success) {
          this.getAllTodoLists();
          this.closeModal('createTodoListModal');
          this.newTodoListTitle = '';
        }
      },
      error: (error) => {
        console.error('Error creating todo list:', error);
      }
    });
  }
}
