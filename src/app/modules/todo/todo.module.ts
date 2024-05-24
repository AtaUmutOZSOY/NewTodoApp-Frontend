import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemService } from './services/todo-item.service';
import { TodoListService } from './services/todo-list.service';
import { TodoAppLayoutComponent } from './layout/todo-app-layout/todo-app-layout.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { CreateTodoItemModalComponent } from './components/modals/create-todo-item-modal/create-todo-item-modal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodoListComponent,
    TodoAppLayoutComponent,
    TodoItemComponent,
    CreateTodoItemModalComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule
  ],
  providers:[
    TodoItemService,
    TodoListService
  ]
})
export class TodoModule { }
