import { Component } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//model
import { CareerOpenPosition } from "../../models/backend/career-open-position.model";
import { CareerGroupOpenPosition } from '../../models/backend/career-group-open-position.model';
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { ToastNotificationService } from '../../services/toast-notification.service';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-career-op',
  templateUrl: './career-op.component.html',
  styleUrls: ['./career-op.component.sass']
})
export class CareerOPComponent {
  editOpenPosition: CareerOpenPosition = new CareerOpenPosition();
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
  OpenPosition: CareerOpenPosition = {
    job_title: '',
    job_location: '',
    group_position: '',
    type_of_work_contract: '',
    image_file: '',
    about_kaigangames: '',
    job_role: '',
    job_responsibilities: '',
    job_requirement: '',
    job_requirement_bonus_point: '',
    job_benefits_and_perks: '',
    current_project: '',
    footer: '',
    createdAt: ''
  };
  submitted = false;
  OpenPositionData?: CareerOpenPosition[];
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
    this.retrieveOpenPosition();
    this.GroupOpenPosition();
  }

  //get data
  retrieveOpenPosition(): void{
    this.backendService.get_OpenPosition().subscribe({
      next: (data) => {
        this.OpenPositionData = data;
        
        setTimeout(()=>{   
          $('#datatableOP').DataTable( {
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
      job_title: this.OpenPosition.job_title,
      job_location: this.OpenPosition.job_location,
      group_position: this.OpenPosition.group_position,
      type_of_work_contract: this.OpenPosition.type_of_work_contract,
      image_file: this.OpenPosition.image_file,
      about_kaigangames: this.OpenPosition.about_kaigangames,
      job_role: this.OpenPosition.job_role,
      job_responsibilities: this.OpenPosition.job_responsibilities,
      job_requirement: this.OpenPosition.job_requirement,
      job_requirement_bonus_point: this.OpenPosition.job_requirement_bonus_point,
      job_benefits_and_perks: this.OpenPosition.job_benefits_and_perks,
      current_project: this.OpenPosition.current_project,
      footer: this.OpenPosition.footer
    };
    
    this.backendService.create_OpenPosition(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;
          let message = "Successfully Create New Open Position Data.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });

    this.clearField();
  }

  //edit data
  editData(id: any): void{
    this.backendService.edit_OpenPosition(id).subscribe((data: any) => {
      this.editOpenPosition.id = data.id;
      this.editOpenPosition.job_title = data.job_title;
      this.editOpenPosition.job_location = data.job_location;
      this.editOpenPosition.group_position = data.group_position;
      this.editOpenPosition.type_of_work_contract = data.type_of_work_contract;
      this.editOpenPosition.image_file = data.image_file;
      this.editOpenPosition.about_kaigangames = data.about_kaigangames;
      this.editOpenPosition.job_role = data.job_role;
      this.editOpenPosition.job_responsibilities = data.job_responsibilities;
      this.editOpenPosition.job_requirement = data.job_requirement;
      this.editOpenPosition.job_requirement_bonus_point = data.job_requirement_bonus_point;
      this.editOpenPosition.job_benefits_and_perks = data.job_benefits_and_perks;
      this.editOpenPosition.current_project = data.current_project;
      this.editOpenPosition.footer = data.footer;

      this.id = data.id
    })
  }

  //update data
  updateData(id: any): void{    
    const editData = {
      job_title: this.editOpenPosition.job_title,
      job_location: this.editOpenPosition.job_location,
      group_position: this.editOpenPosition.group_position,
      type_of_work_contract: this.editOpenPosition.type_of_work_contract,
      image_file: this.editOpenPosition.image_file,
      about_kaigangames: this.editOpenPosition.about_kaigangames,
      job_role: this.editOpenPosition.job_role,
      job_responsibilities: this.editOpenPosition.job_responsibilities,
      job_requirement: this.editOpenPosition.job_requirement,
      job_requirement_bonus_point: this.editOpenPosition.job_requirement_bonus_point,
      job_benefits_and_perks: this.editOpenPosition.job_benefits_and_perks,
      current_project: this.editOpenPosition.current_project,
      footer: this.editOpenPosition.footer
    }
    
    this.backendService.update_OpenPosition(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Open Position Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    })
  }

  //delete data
  deleteOpenPosition(id: any): void{
    this.backendService.delete_OpenPosition(id).subscribe({
      next: (res) => {
        this.submitted  = true;
        let message = `Successfully delete Open Position Data with ID: ${id}`;
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
        this.deleteOpenPosition(id);
        
        Swal.fire(
          'Deleted!',
          'Open Position Data has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Open Position Data is Safe',
          'error'
        )
      }
    })
  }

  //get Group Open Position
  GroupOpenPosition(): void{
    this.backendService.get_GroupOpenPosition().subscribe({
      next: (data) => {
        this.GroupOpenPositionData = data;
      },
      error: (e) => console.error(e)
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
    this.OpenPosition = {
      job_title: '',
      job_location: '',
      group_position: '',
      type_of_work_contract: '',
      image_file: '',
      about_kaigangames: '',
      job_role: '',
      job_responsibilities: '',
      job_requirement: '',
      job_requirement_bonus_point: '',
      job_benefits_and_perks: '',
      current_project: '',
      footer: ''
    };
  }

  reloadPage(): void {
    this.retrieveOpenPosition();
  }
}
