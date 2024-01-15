import { Component } from '@angular/core';
import { faHomeUser, faArrowRight, faCircleInfo, faUserNinja, faRocket, faGamepad, faSquarePhone } from '@fortawesome/free-solid-svg-icons'; 
import { faKhanda} from '@fortawesome/free-solid-svg-icons'; 
import { Router, Event, NavigationStart, NavigationError, NavigationEnd } from '@angular/router';
import { SidebarServiceService } from '../../../services/sidebar.service';
import { ROUTES } from './navigation-routes.config';
import * as $ from 'jquery';

@Component({
  selector: 'app-backend-navigations',
  templateUrl: './backend-navigations.component.html',
  styleUrls: ['./backend-navigations.component.sass']
})
export class BackendNavigationsComponent {
  faHome = faHomeUser;
  faSlider = faKhanda;
  faArrowRight = faArrowRight;
  faCircleInfo = faCircleInfo;
  faUserNinja = faUserNinja;
  faRocket = faRocket;
  faGamepad = faGamepad;
  faSquarePhone = faSquarePhone;
  public menuItems: any[] | undefined;
  width: any;

  constructor(public sidebarservice: SidebarServiceService, private router: Router){
    this.router.events.subscribe( (event: Event) => {

      if (event instanceof NavigationStart) {
          // Show loading indicator
      }

      this.width = $(window).width();

      if (event instanceof NavigationEnd && this.width < 1025 && ( document.readyState == 'complete' || false ) ) {
        this.toggleSidebar();
        // Hide loading indicator
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator
          // Present error to user
          console.log(event.error);
      }
    });
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    
    if ($(".wrapper").hasClass("nav-collapsed")) {
        // unpin sidebar when hovered
        $(".wrapper").removeClass("nav-collapsed");
        $(".sidebar-wrapper").unbind( "hover");
    } else {
        $(".wrapper").addClass("nav-collapsed");
        $(".sidebar-wrapper").hover(
            function () {
                $(".wrapper").addClass("sidebar-hovered");
            },
            function () {
                $(".wrapper").removeClass("sidebar-hovered");
            }
        )
  
    }

  }

  getSideBarState() {
      return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
      this.sidebarservice.setSidebarState(true);
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    $.getScript('./assets/backend/js/app-sidebar.js');
  }
}
