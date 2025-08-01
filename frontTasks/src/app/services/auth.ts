import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  ok: boolean;
  msg: string;
  data: {
    ID: number;
    Nombre: string;
    token: string;
  };
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3005/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { Correo: string, Contra: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials);
  }
}
