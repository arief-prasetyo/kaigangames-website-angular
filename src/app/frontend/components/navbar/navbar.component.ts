import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  ngOnInit(): void{
    $('#nav-icon2').click(function(){
      $(this).toggleClass('open');
    });

    this.callMobileNavbar();
  }

  callMobileNavbar(){
    $('.menu-icon').on('click', function() {
      $('.menu-top').toggleClass("slide-in");
      $('.menu-bottom').toggleClass("slide-in");
      
      if ($(this).text() == "Menu") {
       $(this).text("Close"); 
      }
      else {
        $(this).text("Menu"); 
      }
    });
  }
}
