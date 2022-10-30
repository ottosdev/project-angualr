import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/Task';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  url: ' http://localhost:3000/task';

  constructor(private http: HttpClient) {}

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:3000/task', task);
  }

  edit(id?:string, task?: Task): Observable<Task> {
    debugger
    return this.http.put<Task>(`http://localhost:3000/task/${id}`, task);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/task');
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/task/${id}`);
  }
}
