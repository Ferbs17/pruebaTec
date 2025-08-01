import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:3005/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> { // ver todas las task
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    return this.http.get(this.baseUrl, { headers });
  }
   createTask(task: any) { // crear task
       const createData = {
    "Titulo": task.Title,
    "Resumen": task.Description,
    }
     const token = localStorage.getItem('token') || '';
    return this.http.post<any>(this.baseUrl, createData, {
      headers: new HttpHeaders({
        Authorization: `${token}`
      })
    });
  }

  updateTask(task: any) { // Actualizar task
    const updateData = {
    "Titulo": task.Title,
    "Resumen": task.Description,
    "Estado": task.Status,
    "idTask": task.ID_task
    }
    const token = localStorage.getItem('token') || '';
    return this.http.put<any>(`${this.baseUrl}`, updateData, {
      headers: new HttpHeaders({
        Authorization: `${token}`
      })
    });
  }

  deleteTask(task: any) {
    const token = localStorage.getItem('token') || '';
    return this.http.request('DELETE', this.baseUrl, {
    body: {"idTask": task},
    headers: new HttpHeaders({
      Authorization: `${token}`
    })
  });
  }
}
