import { Component } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BackendService } from "../../services/backend.service";
import { TokenStorageService } from '../../services/token-storage.service';
import { ToastNotificationService } from '../../services/toast-notification.service';
import { InternshipSlider } from 'src/app/models/backend/internship-slider.model';
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-internship-program-slider',
  templateUrl: './internship-program-slider.component.html',
  styleUrls: ['./internship-program-slider.component.sass']
})
export class InternshipProgramSliderComponent {
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
  // editInternshipSlider: InternshipSlider = new InternshipSlider();
  //form
  IS: InternshipSlider = {
    image: '',
    image_path: '',
    createdAt: ''
  };
  internshipData?: InternshipSlider[];
  //login check
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  //community image
  selectedFiles?: FileList;
  submitted = false;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  imageInfos?: Observable<any>;
  img: any;
  id?: number;

  constructor(private backendService: BackendService,
    private storageService: TokenStorageService, 
    private router: Router, 
    private toastService: ToastNotificationService,
    private ngxFavicon: AngularFaviconService){}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');

    if (this.isLoggedIn) {
      // const user = this.storageService.getUser();
    } else {
      this.router.navigate(['sign-in'])
    }

    this.retrieveInternshipSliderData();
    this.imageInfos = this.backendService.get_internshipSliderImageList();
  }

  //get data
  retrieveInternshipSliderData(): void{
    this.backendService.get_internshipSlider().subscribe({
      next: (data) => {
        this.internshipData = data;
        
        setTimeout(()=>{   
          $('#datatableInternshipData').DataTable( {
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
          console.log(e.target.result);
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
  
        this.backendService.upload_internshipSliderImage(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.imageInfos = this.backendService.get_internshipSliderImageList();
            }
          },
          error: (err: any) => {
            console.log(err);
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
    //slider image remove fakepath
    this.img = this.IS.image;
    let imgName = this.img.replace("C:\\fakepath\\", "");
  
    const data = {
      image: imgName,
      image_path: '/assets/resources/uploads/internship/slider/'+imgName
    };

    this.backendService.create_internshipSlider(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;

          let message = "Successfully Create New Slider Data.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });
    this.uploadImage();
    this.clearField();
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
        this.deleteIS(id, image);
        
        Swal.fire(
          'Deleted!',
          'Internship Slider Data has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Internship Slider Data is Safe',
          'error'
        )
      }
    })
  }

  //delete data
  deleteIS(id: any, image: any): void{
    this.backendService.delete_internshipSlider(id, image).subscribe({
      next: (res) => {
        this.submitted  = true;
        let message = `Successfully delete Internship Slider Data with ID: ${id}`;
        this.showToasterSuccess(message);
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
    this.retrieveInternshipSliderData();
    console.clear();
  }

  clearField(): void {
    this.IS = {
      image: '',
      image_path: ''
    };
  }
}
