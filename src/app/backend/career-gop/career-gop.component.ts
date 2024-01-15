import { Component } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//model
import { CareerGroupOpenPosition } from "../../models/backend/career-group-open-position.model";
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { ToastNotificationService } from '../../services/toast-notification.service';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-career-gop',
  templateUrl: './career-gop.component.html',
  styleUrls: ['./career-gop.component.sass']
})
export class CareerGOPComponent {
  editCareerGOP: CareerGroupOpenPosition = new CareerGroupOpenPosition();
  
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
  GroupOpenPosition: CareerGroupOpenPosition = {
    group_position: '',
    createdAt: ''
  };
  submitted = false;
  GroupOpenPositionData?: CareerGroupOpenPosition[];
  //edit data
  id?: number;
  //login check
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

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
    this.retrieveGroupOpenPosition()
  }

  //get data
  retrieveGroupOpenPosition(): void{
    this.backendService.get_GroupOpenPosition().subscribe({
      next: (data) => {
        this.GroupOpenPositionData = data;

        setTimeout(()=>{   
          $('#datatableGOP').DataTable( {
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
    const data = {
      group_position: this.GroupOpenPosition.group_position
    };
    
    this.backendService.create_GroupOpenPosition(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;
          let message = "Successfully Create New Group Open Position Data.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });

    this.clearField();
  }

  //edit data
  editData(id: any): void{
    this.backendService.edit_GroupOpenPosition(id).subscribe((data: any) => {
      this.editCareerGOP.id = data.id;
      this.editCareerGOP.group_position = data.group_position;

      this.id = data.id
    })
  }

  //update data
  updateData(id: any): void{
    const editData = {
      group_position: this.editCareerGOP.group_position
    }
    
    this.backendService.update_GroupOpenPosition(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Group Open Position Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    })
  }

  //delete data
  deleteGroupOpenPosition(id: any): void{
    this.backendService.delete_GroupOpenPosition(id).subscribe({
      next: (res) => {
        this.submitted  = true;
        let message = `Successfully delete Group Open Position Data with ID: ${id}`;
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
        this.deleteGroupOpenPosition(id);
        
        Swal.fire(
          'Deleted!',
          'Group Open Position Data has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Group Open Position Data is Safe',
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
    this.GroupOpenPosition = {
      group_position: ''
    };
  }

  reloadPage(): void {
    this.retrieveGroupOpenPosition();
  }
}
