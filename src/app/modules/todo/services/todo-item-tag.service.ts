import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../../shared/models/list-response-model';
import { TodoItemTag } from '../models/todo-item-tag';
import { Observable } from 'rxjs';
import { CreateTodoItemTagCommand } from '../commands/create-todo-item-tag-command';
import { ResponseModel } from '../../shared/models/response-model';
import { TagCountDto } from '../models/tag-count-dto';

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

  createTodoItemTag(createTodoItemTagCommand:CreateTodoItemTagCommand):Observable<ResponseModel>{
    let newUrl = `${this.baseUrl}/createTodoItemTags`
    return this.httpClient.post<ResponseModel>(newUrl,createTodoItemTagCommand)
  }

  removeTodoItemTag(id: number): Observable<ResponseModel> {
    let newUrl = `${this.baseUrl}/removeTodoItemTagFromTodoItem/${id}`;
    return this.httpClient.put<ResponseModel>(newUrl, null);
  }

  getTagCounts(listId: number): Observable<ListResponseModel<TagCountDto>> {
    const newUrl = `${this.baseUrl}/getTagCounts?listId=${listId}`;
    return this.httpClient.get<ListResponseModel<TagCountDto>>(newUrl);
  }
  
}
