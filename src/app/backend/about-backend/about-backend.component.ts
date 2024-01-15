import { Component } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//model
import { About } from "../../models/backend/about.model";
//fontawesome
import { faCog, faChevronRight, faCircleInfo} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { ToastNotificationService } from '../../services/toast-notification.service';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-about-backend',
  templateUrl: './about-backend.component.html',
  styleUrls: ['./about-backend.component.sass']
})
export class AboutBackendComponent {
  //fontawesome
  faCog = faCog;
  faSlider = faSlideshare;
  faChevronRight =faChevronRight;
  faCircleInfo = faCircleInfo;
  //form
  about: About = {
    content: '',
    createdAt: ''
  };
  submitted = false;
  aboutData?: About[];
  //login check
  roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  isLoginFailed = false;
  errorMessage = '';
  //count data
  aboutDataCount: number | undefined;

  constructor(private backendService: BackendService,
    private storageService: TokenStorageService, 
    private router: Router, 
    private toastService: ToastNotificationService,
    private ngxFavicon: AngularFaviconService){}

  ngOnInit(): void {
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      // const user = this.storageService.getUser();
    } else {
      this.router.navigate(['sign-in'])
    }

    this.retrieveAbout();
  }

  onSubmit(): void {
    const data = {
      content: this.about.content
    };
    
    this.backendService.createAbout(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;

          let message = "Successfully create About Data.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });

    this.clearField();
  }

  retrieveAbout(): void{
    this.backendService.getAllAbout().subscribe({
      next: (data) => {
        this.aboutData = data;
        this.aboutDataCount = data.length;
      },
      error: (e) => console.error(e)
    })
  }

  deleteAbout(id: any): void{
    this.backendService.deteleAbout(id).subscribe({
      next: (res) => {
        this.submitted  = true;

        let message = `Successfully delete About Data with ID: ${id}`;
        this.showToasterSuccess(message);
      }
    })
  }

  clearField(): void {
    this.submitted = false;
    this.about = {
      content: '',
    };
  }

  reloadPage(){
    this.retrieveAbout();   
  }

  showToasterSuccess(msg: string | undefined){
    this.toastService.showSuccess(msg, "Success");
    setTimeout(() => {
      this.reloadPage()
    }, 2500);
  }

  confirmBox(id: any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteAbout(id);
        
        Swal.fire(
          'Deleted!',
          'About Data has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'About Data is Safe',
          'error'
        )
      }
    })
  }
}
