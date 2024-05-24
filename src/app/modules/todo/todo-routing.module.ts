import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoAppLayoutComponent } from './layout/todo-app-layout/todo-app-layout.component';

const routes: Routes = [{
  path:"todo",component:TodoAppLayoutComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
