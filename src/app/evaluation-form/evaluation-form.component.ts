import { Component, OnInit } from '@angular/core';
import Swiper from "swiper";
import {Router} from "@angular/router";
import {ExpertService} from "../services/expert.service";
import {response} from "express";

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent implements OnInit{
  // поля для работы с итогами
  isExpanded1: boolean = false;
  isExpanded2: boolean = false;
  isExpanded3: boolean = false;
  isExpanded4: boolean = false;
  isExpanded5: boolean = false;
  isExpanded6: boolean = false;
  isExpanded7: boolean = false;
  isExpanded8: boolean = false;
  isExpanded9: boolean = false;
  isExpanded10: boolean = false;
  isExpanded11: boolean = false;
  isExpanded12: boolean = false;
  isExpanded13: boolean = false;
  isExpanded14: boolean = false;
  isExpanded15: boolean = false;
  isExpanded16: boolean = false;

  indicatorHeight1: number = 46;
  indicatorHeight2: number = 46;
  indicatorHeight3: number = 46;
  indicatorHeight4: number = 46;
  indicatorHeight5: number = 46;
  indicatorHeight6: number = 46;
  indicatorHeight7: number = 46;
  indicatorHeight8: number = 46;
  indicatorHeight9: number = 46;
  indicatorHeight10: number = 46;
  indicatorHeight11: number = 46;
  indicatorHeight12: number = 46;
  indicatorHeight13: number = 46;
  indicatorHeight14: number = 46;
  indicatorHeight15: number = 46;
  indicatorHeight16: number = 46;

  imageUrl1: string = 'assets/dropdown_little.png';
  imageUrl2: string = 'assets/dropdown_little.png';
  imageUrl3: string = 'assets/dropdown_little.png';
  imageUrl4: string = 'assets/dropdown_little.png';
  imageUrl5: string = 'assets/dropdown_little.png';
  imageUrl6: string = 'assets/dropdown_little.png';
  imageUrl7: string = 'assets/dropdown_little.png';
  imageUrl8: string = 'assets/dropdown_little.png';
  imageUrl9: string = 'assets/dropdown_little.png';
  imageUrl10: string = 'assets/dropdown_little.png';
  imageUrl11: string = 'assets/dropdown_little.png';
  imageUrl12: string = 'assets/dropdown_little.png';
  imageUrl13: string = 'assets/dropdown_little.png';
  imageUrl14: string = 'assets/dropdown_little.png';
  imageUrl15: string = 'assets/dropdown_little.png';
  imageUrl16: string = 'assets/dropdown_little.png'


  // первый блок
  correspondsSubjectCheckbox1: boolean = false;
  correspondsSubjectCheckbox2: boolean = false;
  correspondsSubjectCheckbox3: boolean = false;

  satisfiesProductHypothesesCheckbox1: boolean = false;
  satisfiesProductHypothesesCheckbox2: boolean = false;
  satisfiesProductHypothesesCheckbox3: boolean = false;

  SEOASOCheckbox1: boolean = false;

  optimisationCheckbox1: boolean = false;
  optimisationCheckbox2: boolean = false;
  optimisationCheckbox3: boolean = false;

  // блок 2
  understandingDescriptionOfUsersCheckbox1: boolean = false;

  // блок 3
  projectStructureCheckbox1: boolean = false;
  projectStructureCheckbox2: boolean = false;
  projectStructureCheckbox3: boolean = false;

  createdScreensOfInterfaceCheckbox1: boolean = false;
  createdScreensOfInterfaceCheckbox2: boolean = false;
  createdScreensOfInterfaceCheckbox3: boolean = false;
  createdScreensOfInterfaceCheckbox4: boolean = false;

  patternsOfInterfaceCheckbox1: boolean = false;
  patternsOfInterfaceCheckbox2: boolean = false;

  // блок 4
  basisPrinciplesCheckbox1: boolean = false;
  basisPrinciplesCheckbox2: boolean = false;
  basisPrinciplesCheckbox3: boolean = false;
  basisPrinciplesCheckbox4: boolean = false;
  basisPrinciplesCheckbox5: boolean = false;

  useIcongraphicsCheckbox1: boolean = false;
  useIcongraphicsCheckbox2: boolean = false;
  useIcongraphicsCheckbox3: boolean = false;

  animationAndMotionCheckbox1: boolean = false;
  animationAndMotionCheckbox2: boolean = false;
  animationAndMotionCheckbox3: boolean = false;

  dataVisualisationCheckbox1: boolean = false;
  dataVisualisationCheckbox2: boolean = false;
  dataVisualisationCheckbox3: boolean = false;

  identityAndBrandingCheckbox1: boolean = false;

  //блок 5
  inSystemTextCheckbox1: boolean = false;
  inSystemTextCheckbox2: boolean = false;
  inSystemTextCheckbox3: boolean = false;

  //блок 6
  visualAdaptationCheckbox1: boolean = false;
  visualAdaptationCheckbox2: boolean = false;

  manageStyleAdaptationCheckbox1: boolean = false;

  //индикаторы для отправки оценки
  indicator_1: number = 0;
  indicator_2: number = 0;
  indicator_3: number = 0;
  indicator_4: number = 0;
  indicator_5: number = 0;
  indicator_6: number = 0;
  indicator_7: number = 0;
  indicator_8: number = 0;
  indicator_9: number = 0;
  indicator_10: number = 0;
  indicator_11: number = 0;
  indicator_12: number = 0;
  indicator_13: number = 0;
  indicator_14: number = 0;
  indicator_15: number = 0;
  indicator_16: number = 0;

  constructor(private router: Router, private expertService: ExpertService) {
  }


  removeEvaluationFromLocalStorage(){
    localStorage.removeItem('currentEvaluation');
    this.router.navigate(['/notifications']);
  }

  //отправка оценки
  submitEvaluation(){
    const currentUser = localStorage.getItem('currentUser');
    const currentEvaluation = localStorage.getItem('currentEvaluation');

    const expertWeight = currentUser ? JSON.parse(currentUser)?.weight : '';
    const expertId = currentUser ? JSON.parse(currentUser)?.id : '';

    const evaluationId = currentEvaluation ? JSON.parse(currentEvaluation)?.id : '';

    this.calculateIndicatorsValue();

    this.expertService.addEvaluation(expertWeight, expertId, evaluationId, this.indicator_1.toString(), this.indicator_2.toString(), this.indicator_3.toString(), this.indicator_4.toString(), this.indicator_5.toString(), this.indicator_6.toString(), this.indicator_7.toString(), this.indicator_8.toString(), this.indicator_9.toString(), this.indicator_10.toString(), this.indicator_11.toString(), this.indicator_12.toString(), this.indicator_13.toString(), this.indicator_14.toString(), this.indicator_15.toString(), this.indicator_16.toString())
      .subscribe(response => {
        console.log(response);
        localStorage.removeItem('currentEvaluation');
        this.router.navigate(['/notifications']);
      }, error => {
        console.log(error);
      });

  }

  private calculateIndicatorsValue(){
    //балл индикатора 1
    if(this.correspondsSubjectCheckbox1)
      this.indicator_1 += 0.476;

    if(this.correspondsSubjectCheckbox2)
      this.indicator_1 += 0.476;

    if(this.correspondsSubjectCheckbox3)
      this.indicator_1 += 0.476;

    this.indicator_1 = Number(this.indicator_1.toFixed(3));

    //балл индикатора 2
    if(this.satisfiesProductHypothesesCheckbox1)
      this.indicator_2 += 0.95;

    if(this.satisfiesProductHypothesesCheckbox2)
      this.indicator_2 += 0.95;

    if(this.satisfiesProductHypothesesCheckbox3)
      this.indicator_2 += 0.95;

    this.indicator_2 = Number(this.indicator_2.toFixed(3));

    //балл индикатора 3
    if(this.SEOASOCheckbox1)
      this.indicator_3 += 1.43;

    this.indicator_3 = Number(this.indicator_3.toFixed(3));

    //балл индикатора 4
    if(this.optimisationCheckbox1)
      this.indicator_4 += 1.43;

    if(this.optimisationCheckbox2)
      this.indicator_4 += 1.43;

    if(this.optimisationCheckbox3)
      this.indicator_4 += 1.43;

    this.indicator_4 = Number(this.indicator_4.toFixed(3));

    //балл индикатора 5
    if(this.understandingDescriptionOfUsersCheckbox1)
      this.indicator_5 += 10.0;

    this.indicator_5 = Number(this.indicator_5.toFixed(3));

    //балл индикатора 6
    if(this.projectStructureCheckbox1)
      this.indicator_6 += 1.66;

    if(this.projectStructureCheckbox2)
      this.indicator_6 += 1.66;

    if(this.projectStructureCheckbox3)
      this.indicator_6 += 1.66;

    this.indicator_6 = Number(this.indicator_6.toFixed(3));

    //балл индикатора 7
    if(this.createdScreensOfInterfaceCheckbox1)
      this.indicator_7 += 0.625;

    if(this.createdScreensOfInterfaceCheckbox2)
      this.indicator_7 += 0.625;

    if(this.createdScreensOfInterfaceCheckbox3)
      this.indicator_7 += 0.625;

    if(this.createdScreensOfInterfaceCheckbox4)
      this.indicator_7 += 0.625;

    this.indicator_7 = Number(this.indicator_7.toFixed(3));

    //балл индикатора 8
    if(this.patternsOfInterfaceCheckbox1)
      this.indicator_8 += 1.25;

    if(this.patternsOfInterfaceCheckbox2)
      this.indicator_8 += 1.25;

    this.indicator_8 = Number(this.indicator_8.toFixed(3));

    //балл индикатора 9
    if(this.basisPrinciplesCheckbox1)
      this.indicator_9 += 0.4;

    if(this.basisPrinciplesCheckbox2)
      this.indicator_9 += 0.4;

    if(this.basisPrinciplesCheckbox3)
      this.indicator_9 += 0.4;

    if(this.basisPrinciplesCheckbox4)
      this.indicator_9 += 0.4;

    if(this.basisPrinciplesCheckbox5)
      this.indicator_9 += 0.4;

    this.indicator_9 = Number(this.indicator_9.toFixed(3));

    //балл индикатора 10
    if(this.useIcongraphicsCheckbox1)
      this.indicator_10 += 0.66;

    if(this.useIcongraphicsCheckbox2)
      this.indicator_10 += 0.66;

    if(this.useIcongraphicsCheckbox3)
      this.indicator_10 += 0.66;

    this.indicator_10 = Number(this.indicator_10.toFixed(3));

    //балл индикатора 11
    if(this.animationAndMotionCheckbox1)
      this.indicator_11 += 0.66;

    if(this.animationAndMotionCheckbox2)
      this.indicator_11 += 0.66;

    if(this.animationAndMotionCheckbox3)
      this.indicator_11 += 0.66;

    this.indicator_11 = Number(this.indicator_11.toFixed(3));

    //балл индикатора 12
    if(this.dataVisualisationCheckbox1)
      this.indicator_12 += 0.66;

    if(this.dataVisualisationCheckbox2)
      this.indicator_12 += 0.66;

    if(this.dataVisualisationCheckbox3)
      this.indicator_12 += 0.66;

    this.indicator_12 = Number(this.indicator_12.toFixed(3));

    //балл индикатора 13
    if(this.identityAndBrandingCheckbox1)
      this.indicator_13 += 2.0;

    this.indicator_13 = Number(this.indicator_13.toFixed(3));

    //балл индикатора 14
    if(this.inSystemTextCheckbox1)
      this.indicator_14 += 3.33;

    if(this.inSystemTextCheckbox2)
      this.indicator_14 += 3.33;

    if(this.inSystemTextCheckbox3)
      this.indicator_14 += 3.33;

    this.indicator_14 = Number(this.indicator_14.toFixed(3));

    //балл индикатора 15
    if(this.visualAdaptationCheckbox1)
      this.indicator_15 += 2.5;

    if(this.visualAdaptationCheckbox2)
      this.indicator_15 += 2.5;

    this.indicator_15 = Number(this.indicator_15.toFixed(3));

    //балл индикатора 16
    if(this.manageStyleAdaptationCheckbox1)
      this.indicator_16 += 5.0;

    this.indicator_16 = Number(this.indicator_11.toFixed(3));
  }

  //функция расширяющая и меньшающая блок индекса в зависимости от того, какой номер индикатора ей передан
  DropDownIndicatorBlock(indicatorNumber: number) {
    if (indicatorNumber === 1) {
      this.isExpanded1 = !this.isExpanded1;
      this.indicatorHeight1 = this.isExpanded1 ? 156 : 46;
      this.imageUrl1 = this.isExpanded1 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    } else if (indicatorNumber === 2) {
      this.isExpanded2 = !this.isExpanded2;
      this.indicatorHeight2 = this.isExpanded2 ? 156 : 46;
      this.imageUrl2 = this.isExpanded2 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 3) {
      this.isExpanded3 = !this.isExpanded3;
      this.indicatorHeight3 = this.isExpanded3 ? 90 : 46;
      this.imageUrl3 = this.isExpanded3 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 4) {
      this.isExpanded4 = !this.isExpanded4;
      this.indicatorHeight4 = this.isExpanded4 ? 156 : 46;
      this.imageUrl4 = this.isExpanded4 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 5) {
      this.isExpanded5 = !this.isExpanded5;
      this.indicatorHeight5 = this.isExpanded5 ? 90 : 46;
      this.imageUrl5 = this.isExpanded5 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 6) {
      this.isExpanded6 = !this.isExpanded6;
      this.indicatorHeight6 = this.isExpanded6 ? 156 : 46;
      this.imageUrl6 = this.isExpanded6 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 7) {
      this.isExpanded7 = !this.isExpanded7;
      this.indicatorHeight7 = this.isExpanded7 ? 194 : 46;
      this.imageUrl7 = this.isExpanded7 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 8) {
      this.isExpanded8 = !this.isExpanded8;
      this.indicatorHeight8 = this.isExpanded8 ? 124 : 46;
      this.imageUrl8 = this.isExpanded8 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 9) {
      this.isExpanded9 = !this.isExpanded9;
      this.indicatorHeight9 = this.isExpanded9 ? 234 : 46;
      this.imageUrl9 = this.isExpanded9 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 10) {
      this.isExpanded10 = !this.isExpanded10;
      this.indicatorHeight10 = this.isExpanded10 ? 156 : 46;
      this.imageUrl10 = this.isExpanded10 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 11) {
      this.isExpanded11 = !this.isExpanded11;
      this.indicatorHeight11 = this.isExpanded11 ? 156 : 46;
      this.imageUrl11 = this.isExpanded11 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 12) {
      this.isExpanded12 = !this.isExpanded12;
      this.indicatorHeight12 = this.isExpanded12 ? 156 : 46;
      this.imageUrl12 = this.isExpanded12 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 13) {
      this.isExpanded13 = !this.isExpanded13;
      this.indicatorHeight13 = this.isExpanded13 ? 90 : 46;
      this.imageUrl13 = this.isExpanded13 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 14) {
      this.isExpanded14 = !this.isExpanded14;
      this.indicatorHeight14 = this.isExpanded14 ? 156 : 46;
      this.imageUrl14 = this.isExpanded14 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 15) {
      this.isExpanded15 = !this.isExpanded15;
      this.indicatorHeight15 = this.isExpanded15 ? 124 : 46;
      this.imageUrl15 = this.isExpanded15 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }
    else if (indicatorNumber === 16) {
      this.isExpanded16 = !this.isExpanded16;
      this.indicatorHeight16 = this.isExpanded16 ? 90 : 46;
      this.imageUrl16 = this.isExpanded16 ? 'assets/dropup_little.png' : 'assets/dropdown_little.png';
    }

  }

  ngOnInit(): void{
    const mainSwiper = new Swiper('.swiper-container', {
      // Опции Swiper.js
      simulateTouch: false,
      speed: 600,
      navigation:{
        nextEl: '.main-swiper-button-next',
        prevEl: '.main-swiper-button-prev'
      },
      // effect: "slide",
      spaceBetween: 0,
      // slidesPerView: 1,
      pagination: {
        type: 'bullets',
        el: '.main-swiper-pagination',
        clickable: true,
        renderBullet: function (index, className){
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },

    });

    const subSwiperBlock1 = new Swiper('.sub-swiper-container-1',{
      speed: 600,
      simulateTouch: false,
      navigation:{
        nextEl: '.sub-swiper-button-prev-1',
        prevEl: '.sub-swiper-button-next-1'
      },
      effect: "slide",
      spaceBetween: 0,
      slidesPerView: 1,
      pagination: {
        type: 'bullets',
        el: '.sub-swiper-pagination-1',
        clickable: true,
        renderBullet: function (index, className){
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    });



    const subSwiperBlock2 = new Swiper('.sub-swiper-container-2',{
      speed: 600,
      simulateTouch: false,
      navigation:{
        nextEl: '.sub-swiper-button-prev-2',
        prevEl: '.sub-swiper-button-next-2'
      },
      effect: "slide",
      spaceBetween: 0,
      slidesPerView: 1,
      pagination: {
        type: 'bullets',
        el: '.sub-swiper-pagination-2',
        clickable: true,
        renderBullet: function (index, className){
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    });


    const subSwiperBlock3 = new Swiper('.sub-swiper-container-3',{
      speed: 600,
      simulateTouch: false,
      navigation:{
        nextEl: '.sub-swiper-button-prev-3',
        prevEl: '.sub-swiper-button-next-3'
      },
      effect: "slide",
      spaceBetween: 0,
      slidesPerView: 1,
      pagination: {
        type: 'bullets',
        el: '.sub-swiper-pagination-3',
        clickable: true,
        renderBullet: function (index, className){
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    });

    const subSwiperBlock4 = new Swiper('.sub-swiper-container-4',{
      speed: 600,
      simulateTouch: false,
      navigation:{
        nextEl: '.sub-swiper-button-prev-4',
        prevEl: '.sub-swiper-button-next-4'
      },
      effect: "slide",
      spaceBetween: 0,
      slidesPerView: 1,
      pagination: {
        type: 'bullets',
        el: '.sub-swiper-pagination-4',
        clickable: true,
        renderBullet: function (index, className){
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    });

    const subSwiperBlock5 = new Swiper('.sub-swiper-container-5',{
      speed: 600,
      simulateTouch: false,
      navigation:{
        nextEl: '.sub-swiper-button-prev-5',
        prevEl: '.sub-swiper-button-next-5'
      },
      effect: "slide",
      spaceBetween: 0,
      slidesPerView: 1,
      pagination: {
        type: 'bullets',
        el: '.sub-swiper-pagination-5',
        clickable: true,
        renderBullet: function (index, className){
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    });

    const subSwiperBlock6 = new Swiper('.sub-swiper-container-6',{
      speed: 600,
      simulateTouch: false,
      navigation:{
        nextEl: '.sub-swiper-button-prev-6',
        prevEl: '.sub-swiper-button-next-6'
      },
      effect: "slide",
      spaceBetween: 0,
      slidesPerView: 1,
      pagination: {
        type: 'bullets',
        el: '.sub-swiper-pagination-6',
        clickable: true,
        renderBullet: function (index, className){
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    });

    const subSwiperBlock7 = new Swiper('.sub-swiper-container-7',{
      speed: 600,
      simulateTouch: false,
      navigation:{
        nextEl: '.sub-swiper-button-prev-7',
        prevEl: '.sub-swiper-button-next-7'
      },
      effect: "slide",
      spaceBetween: 0,
      slidesPerView: 1,
      pagination: {
        type: 'bullets',
        el: '.sub-swiper-pagination-7',
        clickable: true,
        renderBullet: function (index, className){
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    });
  }


}
