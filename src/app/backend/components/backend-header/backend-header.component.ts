import { Component } from '@angular/core';
import { faSignOut, faUserSecret, faHouse, faGears } from '@fortawesome/free-solid-svg-icons'; 
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Router } from '@angular/router';
import { BackendService } from "../../../services/backend.service";
import { SidebarServiceService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-backend-header',
  templateUrl: './backend-header.component.html',
  styleUrls: ['./backend-header.component.sass']
})
export class BackendHeaderComponent {
  faSignOut = faSignOut;
  faUserSecret = faUserSecret;
  faHouse = faHouse;
  faGears = faGears;
  //login check
  // roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  dataUser: any;
  user: any;
  roleUser: any;
  // width: any;

  constructor(
    private authService: AuthService, 
    private storageService: TokenStorageService, 
    private router: Router,
    private backendService: BackendService,
    public sidebarservice: SidebarServiceService){
      this.isLoggedIn = this.storageService.isLoggedIn();
  
      if (this.isLoggedIn) {
        this.user = this.storageService.getUser();
        this.roleUser = this.user.roles;
        this.username = this.user.username;
      } else {
        this.router.navigate(['sign-in'])
      }

      this.userDetail(this.user.id)
    }
  
  ngOnInit() {
    /* Search Bar */
    $(".mobile-search-icon").on("click", function() {
  
    $(".search-bar").addClass("full-search-bar")
      
    }), 
  
    $(".search-close").on("click", function() {
        $(".search-bar").removeClass("full-search-bar")
    })
  }

  userDetail(id: any): void{
    this.backendService.current_User(id).subscribe((data) => {
      this.dataUser = data;
    })
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  getSideBarState() {
      return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
      this.sidebarservice.setSidebarState(true);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
