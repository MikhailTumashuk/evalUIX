import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ExpertService} from "../services/expert.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  form!: FormGroup;

  // данные с полей
  username: string = '';
  email: string = '';
  password : string = '';
  isPasswordVisible: boolean = false;
  id: string = "";

  // поля для модального окна
  modalRef: BsModalRef | undefined;
  isModalOpen = false;

  constructor(private modalService: BsModalService,
              private router: Router,
              private formBuilder: FormBuilder,
              private expertService: ExpertService) {
    this.form = this.formBuilder.group({
      "login": [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Zа-яА-Я0-9]+')]],
      "email": [null, [Validators.required, Validators.minLength(5), Validators.email, Validators.maxLength(30)]],
      "password": [null, [Validators.required, Validators.minLength(7), Validators.maxLength(16)]],
      "confirmPassword": ['', Validators.required]
    }, {validators: [passwordMatchValidator()]});
  }

  ngOnInit() {
    this.getUserFromLocalStorage();
  }

  getUserFromLocalStorage(){
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.username = user.username;
      this.email = user.email;
      this.password = user.password;
      this.id = user.id;
    }
  }

  //показать пароль
  togglePasswordVisibility(inputField: HTMLInputElement) {
    this.isPasswordVisible = !this.isPasswordVisible;
    inputField.type = this.isPasswordVisible ? 'text' : 'password';
  }

  // открыть модальное окно
  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
    this.isModalOpen = true;
  }

  // закрыть модальное окно
  closeModal() {
    this.modalRef?.hide();
    this.isModalOpen = false;
  }

  // изменение данных пользователя в базе данных и localStorage
  updateData(): void {
    const data = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    const currentUser = localStorage.getItem('currentUser')
    if( this.id != null && currentUser != null) {
      this.expertService.updateExpert(this.id, data)
        .subscribe(response => {
          localStorage.clear();

          const user = JSON.parse(currentUser);
          user.username = this.username;
          user.email = this.email;
          user.password = this.password;
          localStorage.setItem('currentUser', JSON.stringify(user))
          console.log(response);
          this.closeModal();
          this.refreshPage();
          // Обработка успешного обновления данных
        }, error => {
          console.error(error);
          // Обработка ошибки при обновлении данных
        });
    }else {
      console.log("не удалось обновить данные пользователя")
    }
  }

  //обновление страницы
  refreshPage() {
    location.reload();
  }

}

// свой валидатор для подтверждения пароля
function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    }

    return null;
  };
}
