import { Component } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
//model
import { CareerFeaturedJob } from "../../models/backend/career-featured-job.model";
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { ToastNotificationService } from '../../services/toast-notification.service';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-career-featured-jobs',
  templateUrl: './career-featured-jobs.component.html',
  styleUrls: ['./career-featured-jobs.component.sass']
})
export class CareerFeaturedJobsComponent {
  editCareerFeaturedJob: CareerFeaturedJob = new CareerFeaturedJob();
  
  //fontawesome
  faCog = faCog;
  faSlider = faSlideshare;
  faChevronRight =faChevronRight;
  faMoneyBillWave = faMoneyBillWave;
  faPlusCircle = faPlusCircle;
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faHomeAlt= faHomeAlt;
  //form
  FeaturedJob: CareerFeaturedJob = {
    job_title: '',
    job_location: '',
    job_description: '',
    image: '',
    image_path: '',
    createdAt: ''
  };
  submitted = false;
  FeaturedJobData?: CareerFeaturedJob[];
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

  constructor(private backendService: BackendService,
    private storageService: TokenStorageService, 
    private router: Router, 
    private toastService: ToastNotificationService,
    private ngxFavicon: AngularFaviconService){}

  ngOnInit(): void {
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {} 
    else {
      this.router.navigate(['sign-in'])
    }

    //then load data
    this.retrieveFeaturedJob()
  }

  //get data
  retrieveFeaturedJob(): void{
    this.backendService.get_FeaturedJob().subscribe({
      next: (data) => {
        this.FeaturedJobData = data;

        setTimeout(()=>{   
          $('#datatableFJ').DataTable( {
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

  //create data
  onSubmit(): void {
    //image remove fakepath
    let image = this.FeaturedJob.image;
    let imgName = image?.replace("C:\\fakepath\\", "");

    const data = {
      job_title: this.FeaturedJob.job_title,
      job_location: this.FeaturedJob.job_location,
      job_description: this.FeaturedJob.job_description,
      image: imgName,
      image_path: '/assets/resources/uploads/featured-job/'+imgName
    };
    
    this.backendService.create_FeaturedJob(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;
          let message = "Successfully Create New Featured Job Data.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });
    this.uploadImage();
    this.clearField();
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
          // console.log(e.target.result);
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
  
        this.backendService.uploadFeaturedJob(this.currentFile).subscribe({
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

  //edit data
  editData(id: any): void{
    //image remove fakepath
    let image = this.editCareerFeaturedJob.image;
    let imgName = image?.replace("C:\\fakepath\\", "");
        
    this.backendService.edit_FeaturedJob(id).subscribe((data: any) => {
      this.editCareerFeaturedJob.id = data.id;
      this.editCareerFeaturedJob.job_title = data.job_title;
      this.editCareerFeaturedJob.job_location = data.job_location;
      this.editCareerFeaturedJob.job_description = data.job_description;
      this.editCareerFeaturedJob.image = data.image;
      this.editCareerFeaturedJob.image_path = '/assets/resources/uploads/featured-job/'+imgName

      this.id = data.id
    })
  }

  //update data
  updateData(id: any): void{
    //image remove fakepath
    let image = this.editCareerFeaturedJob.image;
    let imgName = image?.replace("C:\\fakepath\\", "");

    const editData = {
      job_title: this.editCareerFeaturedJob.job_title,
      job_location: this.editCareerFeaturedJob.job_location,
      job_description: this.editCareerFeaturedJob.job_description,
      image: this.editCareerFeaturedJob.image,
      image_path: '/assets/resources/uploads/featured-job/'+imgName 
    }
    
    this.backendService.update_FeaturedJob(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Featured Job Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    })
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

  //delete data
  deleteFeaturedJob(id: any, image: any): void{
    this.backendService.delete_FeaturedJob(id, image).subscribe({
      next: (res) => {
        this.submitted  = true;
        let message = `Successfully delete Featured Job Data with ID: ${id}`;
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
        this.deleteFeaturedJob(id, image);
        
        Swal.fire(
          'Deleted!',
          'Featured Job Data has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Featured Job Data is Safe',
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

  clearField(): void {
    this.submitted = false;
    this.FeaturedJob = {
      job_title: '',
      job_location: '',
      job_description: '',
      image: ''
    };
  }

  reloadPage(): void {
    this.retrieveFeaturedJob();
  }
}
