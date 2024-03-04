import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  loginUser(username: string, password: string): void {
    const url = `${this.baseUrl}/auth`;
    const body = { username, password };
    this.http.post<any>(url, body).subscribe(
      (response) => {
        if (response.success) {
          // Вход выполнен успешно
        } else {
          console.log(response.message); // Неверные учетные данные
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  logout(){}
}
