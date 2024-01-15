import { Component } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { ToastNotificationService } from '../../services/toast-notification.service';
import Swal from 'sweetalert2';
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { CommunityHighlightSection } from 'src/app/models/backend/community-highlight-section.model';
import { Community } from 'src/app/models/backend/community.model';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-community-highlights-section',
  templateUrl: './community-highlights-section.component.html',
  styleUrls: ['./community-highlights-section.component.sass']
})
export class CommunityHighlightsSectionComponent {
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

  editCommunity: CommunityHighlightSection = new CommunityHighlightSection();
  //form
  CL: CommunityHighlightSection = {
    ch_id: '',
    chs_header_text: '',
    chs_name: '',
    chs_content: '',
    createdAt: ''
  };
  communityData?: CommunityHighlightSection[];
  communityHData?: Community[];
  //login check
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  submitted = false;
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
    this.retrieveCommunityHighlightSectionData();
  }

  retrieveCommunityData(): void{
    this.backendService.get_Community().subscribe({
      next: (data) => {
        this.communityHData = data;
      },
      error: (e) => console.error(e)
    })
  }

  retrieveCommunityHighlightSectionData(){
    this.backendService.get_CommunityHighlightSection().subscribe({
      next: (data) => {
        this.communityData = data;
        
        setTimeout(()=>{   
          $('#datatableCommunityHighlightSection').DataTable( {
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

  onSubmit(){
    const data = {
      ch_id: this.CL.ch_id,
      chs_header_text: this.CL.chs_header_text,
      chs_name: this.CL.chs_name,
      chs_content: this.CL.chs_content
    };

    this.backendService.create_CommunityHighlightSection(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;

          let message = "Successfully Create Community Highlight Section Data.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });
    this.clearField();
  }

  editData(id: any): void{
    this.backendService.edit_CommunityHighlightSection(id).subscribe((data) => {
      this.editCommunity.ch_id = data.ch_id;
      this.editCommunity.chs_header_text = data.chs_header_text;
      this.editCommunity.chs_name = data.chs_name;
      this.editCommunity.chs_content = data.chs_content;

      this.id = data.id      
    })
  }

  updateData(id: any): void{
    const editData = {
      ch_id: this.editCommunity.ch_id,
      chs_header_text: this.editCommunity.chs_header_text,
      chs_name: this.editCommunity.chs_name,
      chs_content: this.editCommunity.chs_content
    }
    
    this.backendService.update_CommunityHighlightSection(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Community Highlight Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    });
  }

  deleteCH(id: any): void{
    this.backendService.delete_CommunityHighlightSection(id).subscribe({
      next: (res) => {
        this.submitted  = true;
        let message = `Successfully delete Community Highlight Section Data with ID: ${id}`;
        this.showToasterSuccess(message);
      }
    })
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
        this.deleteCH(id);
        
        Swal.fire(
          'Deleted!',
          'Community Highlight Section Data has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Community Highlight Section Data is safe :)',
          'error'
        )
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
    this.retrieveCommunityHighlightSectionData();
    console.clear();
  }

  clearField(): void {
    this.CL = {
      ch_id: '',
      chs_header_text: '',
      chs_name: '',
      chs_content: ''
    };
  }
}
