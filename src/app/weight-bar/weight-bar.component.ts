import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-weight-bar',
  templateUrl: './weight-bar.component.html',
  styleUrls: ['./weight-bar.component.css']
})
export class WeightBarComponent implements OnInit{
  weight: number = 0;

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.weight = Number(user.weight);
      this.weight *= 10;
      console.log('вес коэф: ' + this.weight)
      if(this.weight != 10){
        this.weight = parseFloat(this.weight.toFixed(1));
      }else {
        this.weight = Math.floor(this.weight);
      }

    }
  }
}
