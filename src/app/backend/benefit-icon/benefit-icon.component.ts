import { Component } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { TokenStorageService } from '../../services/token-storage.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { BenefitIcon } from "../../models/backend/benefit-icon.model";
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare } from '@fortawesome/free-brands-svg-icons';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-benefit-icon',
  templateUrl: './benefit-icon.component.html',
  styleUrls: ['./benefit-icon.component.sass']
})
export class BenefitIconComponent {
  //fontawesome
  faCog = faCog;
  faSlider = faSlideshare;
  faChevronRight =faChevronRight;
  faMoneyBillWave = faMoneyBillWave;
  faPlusCircle = faPlusCircle;
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faHomeAlt= faHomeAlt;

  BenefitIcon: BenefitIcon = {
    icon_name: '',
    icon_path: '',
    iconHover_name: '',
    iconHover_path: '',
    icon_description: '',
    createdAt: ''
  }
  BenefitIconData?: BenefitIcon[];
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
  imageInfos2?: Observable<any>;
  submitted = false;

  selectedFiles2?: FileList;
  currentFile2?: File;
  progress2 = 0;
  message2 = '';
  preview2 = '';
  
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

    //then load data
    this.retrieveBenefitIcon()
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
          // console.log(e.target.result);
          this.preview2 = e.target.result;
        };
  
        reader.readAsDataURL(this.currentFile2);
      }
    }
  }

  uploadImage(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.backendService.uploadBenefitIcon(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.imageInfos = this.backendService.get_benefitIconInfo();
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

  uploadImage2(): void {
    this.progress2 = 0;
  
    if (this.selectedFiles2) {
      const file: File | null = this.selectedFiles2.item(0);
  
      if (file) {
        this.currentFile2 = file;
  
        this.backendService.uploadBenefitIconHover(this.currentFile2).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress2 = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message2 = event.body.message;
              this.imageInfos2 = this.backendService.get_benefitIconHoverInfo();
            }
          },
          error: (err: any) => {
            // console.log(err);
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

  onSubmitBenefitIcon(): void {    
    //image remove fakepath
    let image = this.BenefitIcon.icon_name;
    let imgName = image?.replace("C:\\fakepath\\", "");
    let imageHover = this.BenefitIcon.iconHover_name;
    let imgHoverName = imageHover?.replace("C:\\fakepath\\", "");
    
    const data = {
      icon_name: imgName,
      icon_path: '/assets/resources/uploads/benefit-icon/normal/'+imgName,
      iconHover_name: imgHoverName,
      iconHover_path: '/assets/resources/uploads/benefit-icon/hover/'+imgHoverName,
      icon_description: this.BenefitIcon.icon_description
    };

    this.backendService.create_BenefitIcon(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;

          let message = "Successfully Add Benefit Icon.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });
    this.uploadImage();
    this.uploadImage2();
    this.clearField();
  }

  retrieveBenefitIcon(): void{
    this.backendService.get_BenefitIcon().subscribe({
      next: (data) => {
        this.BenefitIconData = data;

        setTimeout(()=>{   
          $('#datatableBI').DataTable( {
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

  confirmBoxBenefitIcon(id: any, icon: any, iconHover: any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteBenefitIcon(id, icon, iconHover);
        
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

  deleteBenefitIcon(id: any, icon: any, iconHover: any): void{
    this.backendService.delete_BenefitIcon(id, icon, iconHover).subscribe({
      next: (res) => {
        this.submitted  = true;
        let message = `Successfully delete About Team Image with ID: ${id}`;
        this.showToasterSuccess(message);
      }
    })
  }

  showToasterSuccess(msg: string | undefined){
    this.toastService.showSuccess(msg, "Success");
    setTimeout(() => {
      this.reloadPage()
    }, 2500);
  }

  clearField(): void {
    this.submitted = false;
    this.BenefitIcon = {
      icon_name: '',
      icon_path: '',
      iconHover_name: '',
      iconHover_path: '',
      icon_description: '',
    };
  }

  reloadPage(): void {
    this.retrieveBenefitIcon();
  }
}
