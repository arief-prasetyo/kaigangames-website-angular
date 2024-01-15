import { Component } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BackendService } from "../../services/backend.service";
import { TokenStorageService } from '../../services/token-storage.service';
import { ToastNotificationService } from '../../services/toast-notification.service';
import { Testimonials } from 'src/app/models/backend/testimonials.model';
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-testimonial-page',
  templateUrl: './testimonial-page.component.html',
  styleUrls: ['./testimonial-page.component.sass']
})
export class TestimonialPageComponent {
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
  editTestimonial: Testimonials = new Testimonials();
  //form
  Testimonial: Testimonials = {
    front_image: '',
    front_image_path: '',
    testimonial_from: '',
    testimonial_text: '',
    user_image: '',
    user_image_path: '',
    user_name: '',
    user_position: '',
    createdAt: ''
  };
  testimonialsData?: Testimonials[];
  //login check
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  //testimonial image
  selectedFiles?: FileList;
  selectedFiles2?: FileList;
  submitted = false;
  currentFile?: File;
  currentFile2?: File;
  progress = 0;
  progress2 = 0;
  message = '';
  message2 = '';
  preview = '';
  preview2 = '';
  imageInfosTC?: Observable<any>;
  imageInfosTU?: Observable<any>;
  img: any;
  TUImg: any;
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

    this.retrieveTestimonialData();
    this.imageInfosTC = this.backendService.get_testimonialClientImageInfo();
    this.imageInfosTU = this.backendService.get_testimonialUserImageInfo();
  }

  //get data
  retrieveTestimonialData(): void{
    this.backendService.get_testimonials().subscribe({
      next: (data) => {
        this.testimonialsData = data;
        
        setTimeout(()=>{   
          $('#datatableTestimonialData').DataTable( {
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

  selectFile2(event: any): void {
    this.message2 = '';
    this.preview2 = '';
    this.progress2 = 0;
    this.selectedFiles2 = event.target.files;
  
    if (this.selectedFiles2) {
      const file: File | null = this.selectedFiles2.item(0);
  
      if (file) {
        this.preview2 = '';
        this.currentFile2 = file;
  
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview2 = e.target.result;
        };
  
        reader.readAsDataURL(this.currentFile2);
      }
    }
  }

  uploadClientImage(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.backendService.upload_TestimonialClientImage(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.imageInfosTC = this.backendService.get_testimonialClientImageInfo();
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

  uploadUserImage(): void {
    this.progress2 = 0;
  
    if (this.selectedFiles2) {
      const file: File | null = this.selectedFiles2.item(0);
  
      if (file) {
        this.currentFile2 = file;
  
        this.backendService.upload_TestimonialUserImage(this.currentFile2).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message2 = event.body.message;
              this.imageInfosTU = this.backendService.get_testimonialUserImageInfo();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress2 = 0;
  
            if (err.error && err.error.message) {
              this.message2 = err.error.message;
            } else {
              this.message2 = 'Could not upload the image!';
            }
  
            this.currentFile2 = undefined;
          },
        });
      }
  
      this.selectedFiles2 = undefined;
    }
  }

  onSubmit(): void {    
    //image remove fakepath
    this.img = this.Testimonial.front_image;
    let frontImage = this.img.replace("C:\\fakepath\\", "");
    this.TUImg = this.Testimonial.user_image;
    let userImage = this.TUImg.replace("C:\\fakepath\\", "");

    const data = {
      front_image: frontImage,
      front_image_path: '/assets/resources/uploads/testimonials/client/'+frontImage,
      testimonial_from: this.Testimonial.testimonial_from,
      testimonial_text: this.Testimonial.testimonial_text,
      user_image: userImage,
      user_image_path: '/assets/resources/uploads/testimonials/user/'+userImage,
      user_name: this.Testimonial.user_name,
      user_position: this.Testimonial.user_position
    };

    this.backendService.create_Testimonial(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;

          let message = "Successfully Create New Testimonial Data.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });
    this.uploadClientImage();
    this.uploadUserImage();
    this.clearField();
  }

  editData(id: any): void{
    this.backendService.edit_testimonial(id).subscribe((data) => {
      this.editTestimonial.front_image = data.front_image;
      this.editTestimonial.front_image_path = data.front_image_path;
      this.editTestimonial.testimonial_from = data.testimonial_from;
      this.editTestimonial.testimonial_text = data.testimonial_text;
      this.editTestimonial.user_image = data.user_image;
      this.editTestimonial.user_image_path = data.user_image_path;
      this.editTestimonial.user_name = data.user_name;
      this.editTestimonial.user_position = data.user_position;

      this.id = data.id
    })
  }

  deleteTCImage(id: any): void {
    this.backendService.delete_testimonialClientImage(id).subscribe({
      next: (res) => {
        this.submitted = true;
      }
    })
  }

  deleteTUImage(id: any): void {
    this.backendService.delete_testimonialUserImage(id).subscribe({
      next: (res) => {
        this.submitted = true;
      }
    })
  }

  updateData(id: any): void{
    this.deleteTCImage(this.id);
    this.deleteTUImage(this.id);
    
    //image remove fakepath
    this.img = this.editTestimonial.front_image;
    let frontImage = this.img.replace("C:\\fakepath\\", "");
    this.TUImg = this.editTestimonial.user_image;
    let userImage = this.TUImg.replace("C:\\fakepath\\", "");

    const editData = {
      front_image: frontImage,
      front_image_path: '/assets/resources/uploads/testimonials/client/'+frontImage,
      testimonial_from: this.editTestimonial.testimonial_from,
      testimonial_text: this.editTestimonial.testimonial_text,
      user_image: userImage,
      user_image_path: '/assets/resources/uploads/testimonials/user/'+userImage,
      user_name: this.editTestimonial.user_name,
      user_position: this.editTestimonial.user_position
    }
    
    this.backendService.update_testimonial(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Testimonial Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    });

    this.uploadClientImage();
    this.uploadUserImage();
  }

  //delete data
  deleteTestimonial(id: any, client_image: any, user_image: any): void{
    this.backendService.delete_testimonial(id, client_image, user_image).subscribe({
      next: (res) => {
        this.submitted  = true;
        let message = `Successfully delete Testimonial Data with ID: ${id}`;
        this.showToasterSuccess(message);
      }
    })
  }

  confirmBox(id: any,  client_image: any, user_image: any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteTestimonial(id, client_image, user_image);
        
        Swal.fire(
          'Deleted!',
          'Testimonial Data has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Testimonial Data is safe :)',
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
    this.retrieveTestimonialData();
    console.clear();
  }

  clearField(): void {
    this.Testimonial = {
      front_image: '',
      front_image_path: '',
      testimonial_from: '',
      testimonial_text: '',
      user_image: '',
      user_image_path: '',
      user_name: '',
      user_position: ''
    };
  }
}
