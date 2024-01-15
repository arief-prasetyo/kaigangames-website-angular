import { Component } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { BackendService } from "../../services/backend.service";
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { ToastNotificationService } from '../../services/toast-notification.service';
import { Community } from 'src/app/models/backend/community.model';
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.sass']
})
export class CommunityPageComponent {
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
  editCommunity: Community = new Community();
  //form
  CL: Community = {
    month: '',
    community_highlight_image: '',
    image_path: '',
    community_highlight_title: '',
    community_highlight_description: '',
    createdAt: ''
  };
  communityData?: Community[];
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
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      // const user = this.storageService.getUser();
    } else {
      this.router.navigate(['sign-in'])
    }

    this.retrieveCommunityData();
    this.imageInfos = this.backendService.get_communityImageList();
  }

  //get data
  retrieveCommunityData(): void{
    this.backendService.get_Community().subscribe({
      next: (data) => {
        this.communityData = data;
        
        setTimeout(()=>{   
          $('#datatableCommunity').DataTable( {
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
  
        this.backendService.upload_CommunityImage(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.imageInfos = this.backendService.get_communityImageList();
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

  editData(id: any): void{
    this.backendService.edit_Community(id).subscribe((data) => {
      this.editCommunity.month = data.month;
      this.editCommunity.community_highlight_image = data.community_highlight_image;
      this.editCommunity.community_highlight_title = data.community_highlight_title;
      this.editCommunity.community_highlight_description = data.community_highlight_description;
      this.editCommunity.image_path = data.image_path;
      // this.editCommunity.createdAt = data.createdAt;

      this.id = data.id
    })
  }

  deleteImage(id: any): void {
    this.backendService.delete_communityImage(id).subscribe({
      next: (res) => {
        this.submitted = true;
      }
    })
  }

  updateData(id: any): void{
    this.deleteImage(this.id);

    //Community image remove fakepath
    this.img = this.editCommunity.community_highlight_image;
    let imgName = this.img.replace("C:\\fakepath\\", "");

    const editData = {
      month: this.editCommunity.month,
      community_highlight_image:  imgName,
      community_highlight_title: this.editCommunity.community_highlight_title,
      community_highlight_description: this.editCommunity.community_highlight_description,
      image_path: '/assets/resources/uploads/community-highlights/'+imgName,
    }
    
    this.backendService.update_Community(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Community Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    });
    this.uploadImage();
  }

  //notification
  showToasterSuccess(msg: string | undefined){
    this.toastService.showSuccess(msg, "Success");
    setTimeout(() => {
      this.reloadPage()
    }, 2500);
  }

  onSubmit(): void {    
    //Community image remove fakepath
    this.img = this.CL.community_highlight_image;
    let imgName = this.img.replace("C:\\fakepath\\", "");
  
    const data = {
      month: this.CL.month,
      community_highlight_image: imgName,
      community_highlight_title: this.CL.community_highlight_title,
      community_highlight_description: this.CL.community_highlight_description,
      image_path: '/assets/resources/uploads/community-highlights/'+imgName
    };

    this.backendService.create_Community(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;

          let message = "Successfully Create Community Data.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });
    this.uploadImage();
    this.clearField();
    
  }

  //delete data
  deleteCH(id: any, community_highlight_image: any): void{
    this.backendService.delete_Community(id, community_highlight_image).subscribe({
      next: (res) => {
        this.submitted  = true;
        let message = `Successfully delete Community Highlight Data with ID: ${id}`;
        this.showToasterSuccess(message);
      }
    })
  }

  confirmBox(id: any, community_highlight_image: any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteCH(id, community_highlight_image);
        
        Swal.fire(
          'Deleted!',
          'Community Highlight Data has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Community Highlight Data is Safe',
          'error'
        )
      }
    })
  }
  
  reloadPage(): void {
    this.retrieveCommunityData();
    console.clear();
  }

  clearField(): void {
    this.CL = {
      month: '',
      community_highlight_image: '',
      image_path: '',
      community_highlight_title: '',
      community_highlight_description: ''
    };
  }
}
