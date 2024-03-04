import {Component, OnInit} from '@angular/core';
import {ExpertService} from "../services/expert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{
  evaluationRequests: any[] = [];

  constructor(private expertService: ExpertService, private router: Router) {
  }

  ngOnInit() {
    this.getAllNotifications();
  }

  getAllNotifications(){
    const currentUser = localStorage.getItem('currentUser');

    const category = currentUser ? JSON.parse(currentUser)?.category : '';

    if(category){
      this.expertService.getEvaluationRequestsByCategory(category)
        .subscribe((requests: any) => {
          this.evaluationRequests = requests.map((request: any) => {
            return {
              ...request,
              noteHeight: 70, // Инициализируем свойство noteHeight со значением по умолчанию
              isOpen: false, // Добавляем свойство isOpen со значением по умолчанию
              imageUrl: 'assets/dropdown.png', // Добавляем свойство imageUrl со значением по умолчанию
              showDescription: false // Добавляем свойство showDescription со значением по умолчанию
            };
          });
        });
    }

  }

  //функция расширяющая и меньшающая блок оценки при клике
  DropDownNotification(request: any){
    if(!request.isOpen){
      request.noteHeight += 100;
      request.isOpen = true;
      request.imageUrl = 'assets/dropup.png';
      request.showDescription = true;
    }else{
      request.noteHeight -= 100;
      request.isOpen = false;
      request.imageUrl = 'assets/dropdown.png';
      request.showDescription = false;
    }
  }


  toEvaluationForm(request: any){
    // записывем данные о выбранной заявке в localStorage
    localStorage.setItem('currentEvaluation', JSON.stringify(request));

    this.router.navigate(['/evaluation-form']);
  }
}
