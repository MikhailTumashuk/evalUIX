import {Component, OnInit} from '@angular/core';
import {ExpertService} from "../services/expert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-info-bar',
  templateUrl: './user-info-bar.component.html',
  styleUrls: ['./user-info-bar.component.css']
})
export class UserInfoBarComponent implements OnInit{
  username: string = '';
  email: string = '';

  constructor(private router: Router, private expertService: ExpertService) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if ( currentUser != null) {
      const user = JSON.parse(currentUser);
      this.username = user.username;

      this.email = user.email;
    }else {this.router.navigate(['/home']);}
  }
}
