import { Component } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { BackendService } from "../../services/backend.service";
import { Router } from '@angular/router';


//model
import { User } from "../../models/backend/user.model";
import { faCog, faUserAstronaut, faGamepad, faBriefcase} from '@fortawesome/free-solid-svg-icons'; 
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
  faCog = faCog;
  faUserAstronaut = faUserAstronaut;
  faGamepad = faGamepad;
  faBriefcase = faBriefcase;
  //form
  user: User = {
    username: '',
    email: '',
    password: '',
    createdAt: ''
  };
  submitted = false;
  //count data
  userData: number | undefined;
  gameListData: number | undefined;
  OpenPositionData: number | undefined;
  JobApplicationData: number | undefined;
  //login check
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  content?: string;
  roles: string[] = [];
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  accessToken?: string;
  //
  userCount = '';

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];

  constructor(
    private backendService: BackendService,
    private storageService: TokenStorageService, 
    private router: Router,
    private ngxFavicon: AngularFaviconService){}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.accessToken = user.accessToken;
    } else {
      this.router.navigate(['sign-in'])
    }

    this.getUserData();
    this.getGameList();
    this.getOpenPosition();
    this.getJobApp();
  }

  //get user data
  getUserData(): void{
    this.backendService.get_User().subscribe({
      next: (data) => {
        this.userData = data.length;

        setTimeout(()=>{   
          $('#datatableBNP').DataTable( {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu : [5, 10, 25, 50],
            retrieve: true,
          });
        }, 1);
      },
      error: (e) => console.error(e)
    })
  }

  //get game list
  getGameList(): void{
    this.backendService.get_GameList().subscribe({
      next: (data) => {
        this.gameListData = data.length;
        
        setTimeout(()=>{   
          $('#datatableGameList').DataTable( {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu : [5, 10, 25, 50],
            retrieve: true,
          });
        }, 1);
      },
      error: (e) => console.error(e)
    })
  }

  //get open position data
  getOpenPosition(): void{
    this.backendService.get_OpenPosition().subscribe({
      next: (data) => {
        this.OpenPositionData = data.length;
        
        setTimeout(()=>{   
          $('#datatableOP').DataTable( {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu : [5, 10, 25, 50],
            retrieve: true,
          });
        }, 1);
      },
      error: (e) => console.error(e)
    })
  }

  getJobApp(){
    this.backendService.get_JobApplication().subscribe({
      next: (data) => {
        this.JobApplicationData = data.length;
        
        setTimeout(()=>{   
          $('#datatableJobApp').DataTable( {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu : [5, 10, 25, 50],
            retrieve: true,
          });
        }, 1);
      },
      error: (e) => console.error(e)
    })
  }
}
