import { Component } from '@angular/core';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.sass']
})
export class PressComponent {
  constructor(){
    $('body').removeClass("bg-theme2");
  }
}
