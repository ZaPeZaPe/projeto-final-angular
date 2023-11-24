import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiBaseUrl = 'http://localhost:5000/tasks';
  private token = localStorage.getItem('TOKEN');

  constructor(private http: HttpClient) {}

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiBaseUrl);
  }

  public getById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiBaseUrl}/${id}`);
  }

  public createTask(task: Task): Observable<void> {
    return this.http.post<void>(this.apiBaseUrl, task);
  }

  public edit(task: Task): Observable<void> {
    return this.http.put<void>(`${this.apiBaseUrl}/${task.id}`, task);
  }
}
