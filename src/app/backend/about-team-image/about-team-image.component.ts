import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
//service
import { BackendService } from '../../services/backend.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { ToastNotificationService } from '../../services/toast-notification.service';
//model
import { AboutTeamImage } from "../../models/backend/about-team-image.model";
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-about-team-image',
  templateUrl: './about-team-image.component.html',
  styleUrls: ['./about-team-image.component.sass']
})
export class AboutTeamImageComponent {
  //fontawesome
  faCog = faCog;
  faSlider = faSlideshare;
  faChevronRight =faChevronRight;
  faMoneyBillWave = faMoneyBillWave;
  faPlusCircle = faPlusCircle;
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faHomeAlt= faHomeAlt;
  faSearch = faSearch;
  //form
  aboutTeamImage: AboutTeamImage = {
    image: '',
    image_path: '',
    createdAt: ''
  };
  submitted = false;
  aboutTeamImageData?: AboutTeamImage[];
  tagItems = [];
  //edit data
  id?: number;
  //login check
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  //image
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  imageInfos?: Observable<any>;

  constructor(private storageService: TokenStorageService, 
    private router: Router, 
    private toastService: ToastNotificationService,
    private backendService: BackendService,
    private ngxFavicon: AngularFaviconService){}

  ngOnInit(): void{
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
    } else {
      this.router.navigate(['sign-in'])
    }

    //then load data
    this.retrieveAboutTeamImage();
    this.imageInfos = this.backendService.get_AboutTeamImage();
  }

  retrieveAboutTeamImage(): void{
    this.backendService.get_AboutTeamImage().subscribe({
      next: (data) => {
        this.aboutTeamImageData = data;
        
        setTimeout(()=>{   
          $('#datatableAboutTI').DataTable( {
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

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };
  
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  uploadImage(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.backendService.uploadAboutTeamImage(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.imageInfos = this.backendService.getGameImage();
            }
          },
          error: (err: any) => {
            // console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the image!';
            }
  
            this.currentFile = undefined;
          },
        });
      }
  
      this.selectedFiles = undefined;
    }
  }

  onSubmit(): void {    
    //image remove fakepath
    let image = this.aboutTeamImage.image;
    let imgName = image?.replace("C:\\fakepath\\", "");
    
    const data = {
      image: image,      
      image_path: '/assets/resources/uploads/about-team-image/'+imgName
    };

    this.backendService.create_AboutTeamImage(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;

          let message = "Successfully Add About Team Image.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });
    this.uploadImage();
  }

  //delete data
  deleteTeamImage(id: any, image: any): void{
    this.backendService.delete_AboutTeamImage(id, image).subscribe({
      next: (res) => {
        this.submitted  = true;
        let message = `Successfully delete About Team Image with ID: ${id}`;
        this.showToasterSuccess(message);
      }
    })
  }

  confirmBox(id: any, image: any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteTeamImage(id, image);
        
        Swal.fire(
          'Deleted!',
          'About Team Image has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'About Team Image is Safe',
          'error'
        )
      }
    })
  }

  //notification
  showToasterSuccess(msg: string | undefined){
    this.toastService.showSuccess(msg, "Success");
    setTimeout(() => {
      this.reloadPage()
    }, 2500);
  }

  reloadPage(): void {
    this.retrieveAboutTeamImage();
    console.clear();
  }
}
