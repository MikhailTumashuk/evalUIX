import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  form!: FormGroup;

  email: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;

  errorMessage: string = '';


  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private http: HttpClient) {
    this.form = this.formBuilder.group({
      "email": [null, [Validators.required, Validators.minLength(5), Validators.email]],
      "password": [null, [Validators.required, Validators.minLength(7), Validators.maxLength(16)]]
  })
  }

  login(email: string, password: string): void {
    const body = { email, password };
    this.http.post<any>('http://localhost:3000/api/auth', body).subscribe(
      (response) => {
        if (response.success) {
          // Вход выполнен успешно
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.router.navigate(['/account-main-page']);
          console.log('Вы успешно авторизованы');
        } else {
          this.errorMessage = response.message;
          console.log(response.message); // Неверные учетные данные
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //показать пароль
  togglePasswordVisibility(inputField: HTMLInputElement) {
    this.isPasswordVisible = !this.isPasswordVisible;
    inputField.type = this.isPasswordVisible ? 'text' : 'password';
  }
}
