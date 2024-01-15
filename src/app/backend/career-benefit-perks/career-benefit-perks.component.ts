import { Component } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//model
import { CareerBenefitPerks } from "../../models/backend/career-benefit-perks.model";
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { ToastNotificationService } from '../../services/toast-notification.service';
//fontawesome
import { faBed, faPersonPregnant, faSuitcaseMedical, faGlasses, faUtensils,
  faHandsHoldingCircle, faHandsHoldingChild, faSkullCrossbones, faCar, faCheck } from '@fortawesome/free-solid-svg-icons'; 
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-career-benefit-perks',
  templateUrl: './career-benefit-perks.component.html',
  styleUrls: ['./career-benefit-perks.component.sass']
})
export class CareerBenefitPerksComponent {
  //fontawesome
  faBed = faBed;
  faPersonPregnant = faPersonPregnant;
  faSuitcaseMedical = faSuitcaseMedical;
  faGlasses = faGlasses;
  faHandHoldingCirlce = faHandsHoldingCircle;
  faHandsHoldingChild = faHandsHoldingChild;
  faSkullCrossbones = faSkullCrossbones;
  faUtensils = faUtensils;
  faCar = faCar;
  faCheck = faCheck;
  
  editCareerBenefitForm: CareerBenefitPerks = new CareerBenefitPerks();

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
  BenefitPerks: CareerBenefitPerks = {
    icon: '',
    title: '',
    description: '',
    createdAt: ''
  };
  submitted = false;
  BenefitPerksData?: CareerBenefitPerks[];
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
    this.retrieveBenefitPerksData()
  }

  //get data
  retrieveBenefitPerksData(): void{
    this.backendService.get_BenefitPerks().subscribe({
      next: (data) => {
        this.BenefitPerksData = data;

        setTimeout(()=>{   
          $('#datatableBNP').DataTable( {
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
      icon: this.BenefitPerks.icon,
      title: this.BenefitPerks.title,
      description: this.BenefitPerks.description
    };
    
    this.backendService.create_BenefitPerks(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;

          let message = "Successfully Create New Benefit and Perks Data.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });

    this.clearField();
  }

  //edit data
  editData(id: any): void{
    this.backendService.edit_BenefitPerks(id).subscribe((data: any) => {
      this.editCareerBenefitForm.id = data.id;
      this.editCareerBenefitForm.title = data.title;
      this.editCareerBenefitForm.description = data.description;

      this.id = data.id
    })
  }

  //update data
  updateData(id: any): void{
    const editData = {
      icon: this.editCareerBenefitForm.icon,
      title: this.editCareerBenefitForm.title,
      description: this.editCareerBenefitForm.description
    }
    
    this.backendService.update_BenefitPerks(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Benefit and Perks Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    })
  }

  //delete data
  deleteBenefitPerks(id: any): void{
    this.backendService.delete_BenefitPerks(id).subscribe({
      next: (res) => {
        this.submitted  = true;

        let message = `Successfully delete Benefit / Perks Data with ID: ${id}`;
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
        this.deleteBenefitPerks(id);
        
        Swal.fire(
          'Deleted!',
          'Benefit and Perks Data has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Benefit and Perks Data is Safe',
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

  clearField(): void {
    this.submitted = false;
    this.BenefitPerks = {
      icon: '',
      title: '',
      description: ''
    };
  }

  reloadPage(): void {
    this.retrieveBenefitPerksData();
  }
}
