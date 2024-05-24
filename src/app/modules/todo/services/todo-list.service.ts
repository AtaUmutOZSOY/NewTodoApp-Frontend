import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../../shared/models/list-response-model';
import { TodoList } from '../models/todo-list';
import { CreateTodoListCommand } from '../commands/create-todo-list-command';
import { SingleResponseModel } from '../../shared/models/single-response-model';
import { ResponseModel } from '../../shared/models/response-model';
import { UpdateTodoListNameCommand } from '../commands/update-todo-list-name-command';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private baseTodoListUrl:string = environment.apiUrl+'/TodoLists';
  constructor(private httpClient:HttpClient) { }
  // https://localhost:44315/api/TodoLists/getAllTodoList

  getAllTodoLists():Observable<ListResponseModel<TodoList>>{
    let newUrl = this.baseTodoListUrl+'/getAllTodoLists';
    return this.httpClient.get<ListResponseModel<TodoList>>(newUrl);
  }

  createTodoList(createTodoListCommand:CreateTodoListCommand){
    let newUrl = this.baseTodoListUrl+'/createTodoList';
    return this.httpClient.post<SingleResponseModel<TodoList>>(newUrl,createTodoListCommand);
  }

  softDeleteTodoList(id:number){
    let newUrl = `${this.baseTodoListUrl}/deleteById/${id}`;
    return this.httpClient.put<ResponseModel>(newUrl,id);
  }

  updateTodoListName(updateTodoListNameCommand:UpdateTodoListNameCommand){
    let newUrl = this.baseTodoListUrl+'/updateTodoListName';
    return this.httpClient.put<ResponseModel>(newUrl,updateTodoListNameCommand);
  }
}
