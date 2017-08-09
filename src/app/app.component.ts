import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data: Array<string>;
  choice: string;

  constructor(){

    this.data = [
      'Lucknow',
      'Pune',
      'Bangalore',
      'Delhi',
      'Chennai',
      'Hyderabad'
    ];

    this.choice = null;

  }

}
