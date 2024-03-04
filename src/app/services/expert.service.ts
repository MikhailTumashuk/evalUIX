import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  private baseUrl = 'http://localhost:3000/api'; // URL сервера Express.js

  constructor(private http: HttpClient) {}

  // получение экспертов
  getExperts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/expert`);
  }

  // регистрация экспертов
  registerUser(username: string, email:string, password: string, weight: string, category: string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    const body = { username, email, password, weight, category};
    return this.http.post(url, body);
  }

  // обновление данных эксперта
  updateExpert(id: string, data: any): Observable<any> {
    const url = `${this.baseUrl}/expert/${id}`;
    return this.http.put(url, data);
  }

  //получение заявок экспертом
  getEvaluationRequestsByCategory(category: string) {
    const url = `${this.baseUrl}/evaluation_request/get-request-by-category`;
    return this.http.get(url, { params: { category } });
  }

  // отправка оценки на сервер
  addEvaluation(
    expertWeight: number,
    expertId: number,
    evaluationId: number,
    indicator_1: string,
    indicator_2: string,
    indicator_3: string,
    indicator_4: string,
    indicator_5: string,
    indicator_6: string,
    indicator_7: string,
    indicator_8: string,
    indicator_9: string,
    indicator_10: string,
    indicator_11: string,
    indicator_12: string,
    indicator_13: string,
    indicator_14: string,
    indicator_15: string,
    indicator_16: string,
    ){
    const url = `${this.baseUrl}/evaluation`;
    const body = { expertWeight, expertId, evaluationId, indicator_1, indicator_2, indicator_3, indicator_4, indicator_5, indicator_6, indicator_7, indicator_8, indicator_9, indicator_10, indicator_11, indicator_12, indicator_13, indicator_14, indicator_15, indicator_16};
    return this.http.post(url, body);
  }
}
