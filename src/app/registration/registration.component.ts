import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, AbstractControl} from "@angular/forms";
import Swiper from "swiper";
import {ExpertService} from "../services/expert.service";
import {response} from "express";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit{
  form!: FormGroup;
  // чекбоксы в первом вопросе
  checkbox1: boolean = false;
  checkbox2: boolean = false;
  checkbox3: boolean = false;
  checkbox4: boolean = false;
  checkbox5: boolean = false;
  checkbox6: boolean = false;
  checkbox7: boolean = false;
  // слайдер во втором вопросе
  sliderValue = "30";
  // вопросы 3,4,5,6
  highRadio1: boolean = false;
  middleRadio1: boolean = false;
  lowRadio1: boolean = false;

  highRadio2: boolean = false;
  middleRadio2: boolean = false;
  lowRadio2: boolean = false;

  highRadio3: boolean = false;
  middleRadio3: boolean = false;
  lowRadio3: boolean = false;

  highRadio4: boolean = false;
  middleRadio4: boolean = false;
  lowRadio4: boolean = false;

  // выбранная категория
  selectedCategory: string = '';

  // цвет текста в последнем вопросе
  color: string = 'black';
  borderColor: string = '8F8F8F'

  // данные с первой формы
  username: string = '';
  email: string = '';
  password : string = '';
  isPasswordVisible: boolean = false;


  constructor(private router: Router, private formBuilder: FormBuilder, private expertService: ExpertService) {
    this.form = this.formBuilder.group({
      "login": [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Zа-яА-Я0-9]+')]],
      "email": [null, [Validators.required, Validators.minLength(5), Validators.email, Validators.maxLength(30)]],
      "password": [null, [Validators.required, Validators.minLength(7), Validators.maxLength(16)]],
      "confirmPassword": ['', Validators.required]
    }, {validators: [passwordMatchValidator()]});
  }
  isValid(){
    console.log(this.form.valid);
  }

  ngOnInit(): void {
    const mainSwiper = new Swiper('.main-swiper-container', {
      // Опции Swiper.js
      simulateTouch: false,
      speed: 600,
      navigation:{
        nextEl: '.main-swiper-button-next',
        prevEl: '.main-swiper-button-prev'
      },
      // effect: "slide",
      spaceBetween: 0,
      slidesPerView: 1,
      pagination: {
        type: 'bullets',
        el: '.main-swiper-pagination',
        clickable: true,
        renderBullet: function (index, className){
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },

    });

    const subSwiperBlock = new Swiper('.sub-swiper-container',{
      speed: 600,
      simulateTouch: false,
      navigation:{
        nextEl: '.sub-swiper-button-prev',
        prevEl: '.sub-swiper-button-next'
      },
      effect: "slide",
      spaceBetween: 0,
      slidesPerView: 1,
      pagination: {
        type: 'bullets',
        el: '.sub-swiper-pagination',
        clickable: true,
        renderBullet: function (index, className){
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    });

  }

  // регистрация пользователя
  registerUser(){
    let expertWeight: string = this.calculateExpertWeightEvaluation().toFixed(3).toString();
    let expertCategory : string = this.selectedCategory;
    if(this.selectedCategory == ""){
      this.color = 'red';
      this.borderColor = 'red';
      return;
    }

    this.expertService.registerUser(this.username, this.email, this.password, expertWeight, expertCategory).subscribe(
      response => {
        console.log(response); // Обработка успешного ответа от сервера
        this.router.navigate(['/auth']);
      },
      error => {
        console.error(error); // Обработка ошибки
      }
    )

    // console.log(this.username + ' ' + this.email + ' ' + this.password)
    // console.log(expertWeight + expertCategory);
  }


  // считает весовой коэффициент эксперта
  calculateExpertWeightEvaluation(): number{
    let checkBoxSum: number = 0;
    let rangeValue: number = 0;
    let radioSum: number = 0;

    // вопрос 1
    if(this.checkbox1)
      checkBoxSum += Number(document.getElementById('skills-checkbox-1')?.getAttribute('value'));

    if(this.checkbox2)
      checkBoxSum += Number(document.getElementById('skills-checkbox-2')?.getAttribute('value'));

    if(this.checkbox3)
      checkBoxSum += Number(document.getElementById('skills-checkbox-3')?.getAttribute('value'));

    if(this.checkbox4)
      checkBoxSum += Number(document.getElementById('skills-checkbox-4')?.getAttribute('value'));

    if(this.checkbox5)
      checkBoxSum += Number(document.getElementById('skills-checkbox-5')?.getAttribute('value'));

    if(this.checkbox6)
      checkBoxSum += Number(document.getElementById('skills-checkbox-6')?.getAttribute('value'));

    if(this.checkbox7)
      checkBoxSum += Number(document.getElementById('skills-checkbox-7')?.getAttribute('value'));

    // вопрос 2
    rangeValue = Number(this.sliderValue);
    rangeValue *= 0.01;

    // вопрос 3
    if (this.highRadio1)
      radioSum += Number(document.getElementById('high-radio-1')?.getAttribute('value'));
    else if (this.middleRadio1)
      radioSum += Number(document.getElementById('middle-radio-1')?.getAttribute('value'));
    else if (this.lowRadio1)
      radioSum += Number(document.getElementById('low-radio-1')?.getAttribute('value'));
    //вопрос 4
    if (this.highRadio2)
      radioSum += Number(document.getElementById('high-radio-2')?.getAttribute('value'));
    else if (this.middleRadio2)
      radioSum += Number(document.getElementById('middle-radio-2')?.getAttribute('value'));
    else if (this.lowRadio2)
      radioSum += Number(document.getElementById('low-radio-2')?.getAttribute('value'));

    // вопрос 5
    if (this.highRadio3)
      radioSum += Number(document.getElementById('high-radio-3')?.getAttribute('value'));
    else if (this.middleRadio3)
      radioSum += Number(document.getElementById('middle-radio-3')?.getAttribute('value'));
    else if (this.lowRadio3)
      radioSum += Number(document.getElementById('low-radio-3')?.getAttribute('value'));

    //вопрос 6
    if (this.highRadio4)
      radioSum += Number(document.getElementById('high-radio-4')?.getAttribute('value'));
    else if (this.middleRadio4)
      radioSum += Number(document.getElementById('middle-radio-4')?.getAttribute('value'));
    else if (this.lowRadio4)
      radioSum += Number(document.getElementById('low-radio-4')?.getAttribute('value'));

    return ((Number(checkBoxSum.toFixed(1)) + Number(radioSum.toFixed(1))) / 2) * rangeValue;
  }

// слайдер внутри вопроса
  valueChanged(e: any) {
    this.sliderValue = e.target.value;
  }

  // показать пароль
  togglePasswordVisibility(inputField: HTMLInputElement) {
    this.isPasswordVisible = !this.isPasswordVisible;
    inputField.type = this.isPasswordVisible ? 'text' : 'password';
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


