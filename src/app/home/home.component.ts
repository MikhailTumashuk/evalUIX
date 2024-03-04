import { Component } from '@angular/core';
import {ExpertService} from "../services/expert.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  experts: any[] = [];

  constructor(private personService: ExpertService) {}

  ngOnInit(): void {
    this.personService.getExperts().subscribe(
      (data) => {
        this.experts = data;
      },
      (error) => {
        console.error('Error fetching persons', error);
      }
    );
  }
}
