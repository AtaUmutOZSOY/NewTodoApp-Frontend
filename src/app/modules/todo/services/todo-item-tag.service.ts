import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../../shared/models/list-response-model';
import { TodoItemTag } from '../models/todo-item-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoItemTagService {

  private readonly baseUrl:string = environment.apiUrl+'/TodoItemTags';

  constructor(private httpClient:HttpClient) { }

  getAllTodoItemTagsByTodoItemId(todoItemId:number):Observable<ListResponseModel<TodoItemTag>>{
    let newUrl = `${this.baseUrl}/getAllTodoItemTagsByTodoItemId/${todoItemId}`
    return this.httpClient.get<ListResponseModel<TodoItemTag>>(newUrl);
  }
}
