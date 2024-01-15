import { Component } from '@angular/core';

@Component({
  selector: 'app-backend-footer',
  templateUrl: './backend-footer.component.html',
  styleUrls: ['./backend-footer.component.sass']
})
export class BackendFooterComponent {
  currDate: any = '';
  currYear: any = ''; 

  constructor(){
    this.currDate = new Date();
    this.currYear = this.currDate.getFullYear();
  }
}
