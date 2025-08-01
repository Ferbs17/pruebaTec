import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  private baseUrl = 'http://localhost:3005/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> { // ver todas los usuarios
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    return this.http.get(this.baseUrl, { headers });
  }
   createUser(data: any) { // crear usuario
       const createData = {
    "Nombre": data.Name,
    "Correo": data.Email,
    "Telefono": data.Phone,
    "Contra": data.Password
}
     const token = localStorage.getItem('token') || '';
    return this.http.post<any>(`${this.baseUrl}/register`, createData, {
      headers: new HttpHeaders({
        Authorization: `${token}`
      })
    });
  }
}
