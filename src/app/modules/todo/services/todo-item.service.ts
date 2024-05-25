import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../../shared/models/response-model';
import { CreateTodoItemCommand } from '../commands/create-todo-item-command';
import { ListResponseModel } from '../../shared/models/list-response-model';
import { TodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {


  private baseUrl = environment.apiUrl+'/TodoItems';

  constructor(private httpClient:HttpClient) { }

  createTodoItem(createTodoItemCommand:CreateTodoItemCommand):Observable<ResponseModel>{
    let newUrl = this.baseUrl+'/createTodoItem';
    return this.httpClient.post<ResponseModel>(newUrl,createTodoItemCommand)
  }

  getActiveTodoItemsByListId(listId:number):Observable<ListResponseModel<TodoItem>>{
    let newUrl = `${this.baseUrl}/getAllActiveTodoItems?listId=${listId}`;
    return this.httpClient.get<ListResponseModel<TodoItem>>(newUrl)
  }


}
