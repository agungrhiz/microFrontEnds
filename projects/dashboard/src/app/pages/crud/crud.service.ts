import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Crud } from './crud';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://jsonplaceholder.typicode.com';
  }

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/todos`);
  }

  getTodo(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/todos/${id}`);
  }

  createTodo(data: Crud): Observable<any> {
    return this.http.post<any>(`${this.url}/todos`, data);
  }

  updateTodo(id: number, data: Crud): Observable<any> {
    return this.http.put<any>(`${this.url}/todos/${id}`, data);
  }

  createOrUpdateTodo(data: Crud): Observable<any> {
    if (!data.id) {
      return this.createTodo(data);
    }
    return this.updateTodo(data.id, data);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/todos/${id}`);
  }
}
