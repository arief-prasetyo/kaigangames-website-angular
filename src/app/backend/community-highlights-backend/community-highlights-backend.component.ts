import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { BackendService } from "../../services/backend.service";
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { ToastNotificationService } from '../../services/toast-notification.service';
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { CommunityHighlights } from 'src/app/models/backend/community-highlights.model';
import { Community } from 'src/app/models/backend/community.model';
import { CommunityHighlightSection } from 'src/app/models/backend/community-highlight-section.model';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-community-highlights-backend',
  templateUrl: './community-highlights-backend.component.html',
  styleUrls: ['./community-highlights-backend.component.sass']
})
export class CommunityHighlightsBackendComponent {
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
  editCommunity: CommunityHighlights = new CommunityHighlights();
  //form
  CL: CommunityHighlights = {
    month: '',
    monthTemp: '',
    under_section: '',
    image: '',
    image_path: '',
    maker_name: '',
    maker_link: '',
    maker_origin: '',
    createdAt: ''
  };
  communityData?: CommunityHighlights[];
  communityDataLength: any;
  communityData2?: Community[];
  CHSData?: CommunityHighlightSection[];
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
  communityID: any;

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
    this.retrieveCommunityHighlightData();
    // this.retrieveCHS();
    this.imageInfos = this.backendService.get_communityHighlightImageList();
  }

  retrieveCommunityData(){
    this.backendService.get_Community().subscribe({
      next: (data) => {
        this.communityData2 = data;
        // console.log('community data', this.communityData2);
        
      },
      error: (e) => console.error(e)
    })
  }

  onSelected(value: any){
    this.communityID = value;
    // console.log(this.communityID);
    this.retrieveCHS(this.communityID)
  }

  retrieveCommunityHighlightData(): void{
    this.backendService.get_communityHighlight().subscribe({
      next: (data) => {
        this.communityData = data;
        this.communityDataLength = this.communityData.length;
        
        setTimeout(()=>{   
          $('#datatableCommunityHighlights').DataTable( {
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

  retrieveCHS(id: any){
    this.backendService.detail_CommunityHighlightSection(id).subscribe({
      next: (data) => {
        this.CHSData = data;
        // console.log('CHS DATA', data);
      },
      error: (e) => console.log(e)
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
  
        this.backendService.upload_CommunityHighlightImage(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.imageInfos = this.backendService.get_communityHighlightImageList();
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
    //Community image remove fakepath
    this.img = this.CL.image;
    let imgName = this.img.replace("C:\\fakepath\\", "");
  
    const data = {
      month: this.CL.month,
      under_section: this.CL.under_section,
      image: imgName,
      image_path: '/assets/resources/uploads/community-highlights-monthly/'+imgName,
      maker_name: this.CL.maker_name,
      maker_link: this.CL.maker_link,
      maker_origin: this.CL.maker_origin,
    };

    // console.log(data);
    this.backendService.create_CommunityHighlight(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;

          let message = "Successfully Create Community Highlight Data.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });
    this.uploadImage();
    this.clearField();
  }

  editData(id: any): void{
    this.backendService.edit_CommunityHighlight(id).subscribe((data) => {
      this.editCommunity.month = data.month;
      this.editCommunity.image = data.image;
      this.editCommunity.image_path = data.image_path;
      this.editCommunity.maker_name = data.maker_name;
      this.editCommunity.maker_link = data.maker_link;
      this.editCommunity.maker_origin = data.maker_origin;

      this.id = data.id
    })
  }

  updateData(id: any): void{
    this.deleteImage(this.id);

    //Community image remove fakepath
    this.img = this.editCommunity.image;
    let imgName = this.img.replace("C:\\fakepath\\", "");

    const editData = {
      month: this.editCommunity.month,
      image:  imgName,
      image_path: '/assets/resources/uploads/community-highlights-monthly/'+imgName,
      maker_name: this.editCommunity.maker_name,
      maker_link: this.editCommunity.maker_link,
      maker_origin: this.editCommunity.maker_origin,
    }
    
    this.backendService.update_CommunityHighlight(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Community Highlight Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    });
    this.uploadImage();
  }

  deleteImage(id: any): void {
    this.backendService.delete_communityHighlightImage(id).subscribe({
      next: (res) => {
        this.submitted = true;
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
        this.deleteCH(id, image);
        
        Swal.fire(
          'Deleted!',
          'Community Highlight Data has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Community Highlight Data is safe :)',
          'error'
        )
      }
    })
  }

  deleteCH(id: any, image: any): void{
    this.backendService.delete_CommunityHighlight(id, image).subscribe({
      next: (res) => {
        this.submitted  = true;
        let message = `Successfully delete Community Highlight Data with ID: ${id}`;
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

  reloadPage(): void {
    this.retrieveCommunityHighlightData();
    console.clear();
  }

  clearField(): void {
    this.CL = {
      month: '',
      monthTemp: '',
      under_section: '',
      image: '',
      image_path: '',
      maker_name: '',
      maker_link: '',
      maker_origin: ''
    };
  }
}
