import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//services
import { TokenStorageService } from '../../services/token-storage.service';
import { BackendService } from "../../services/backend.service";
import { ToastNotificationService } from '../../services/toast-notification.service';
//model
import { Press } from "../../models/backend/press.model";
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-press-backend',
  templateUrl: './press-backend.component.html',
  styleUrls: ['./press-backend.component.sass']
})
export class PressBackendComponent {
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
  //edit data
  id?: number;
  //login check
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  submitted = false;
  pressData?: Press[];
  //form
  pressList: Press = {
    press_title: '',
    press_content: '',
    press_source_link: '',
    createdAt: ''
  };
  editPressForm: Press = new Press();

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

    //then load data
    this.getPressList();
  }

  getPressList(): void{
    this.backendService.get_press().subscribe({
      next: (data) => {
        this.pressData = data;
        
        setTimeout(()=>{   
          $('#pressData').DataTable( {
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

  onSubmit(): void {
    const data = {
      press_title: this.pressList.press_title,
      press_content: this.pressList.press_content,
      press_source_link: this.pressList.press_source_link,
    };
    
    this.backendService.create_Press(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;

          let message = "Successfully create Press Data.";
          this.showToasterSuccess(message)
        },
        error: (e) => console.error(e)
      });

    this.clearField();
  }

  //edit data
  editData(id: any): void{
    this.backendService.edit_press(id).subscribe((data: any) => {
      this.editPressForm.id = data.id;
      this.editPressForm.press_title = data.press_title;
      this.editPressForm.press_content = data.press_content;
      this.editPressForm.press_source_link = data.press_source_link;

      this.id = data.id
      // console.log(data);
      
    })
  }

  //update data
  updateData(id: any): void{
    const editData = {
      press_title: this.editPressForm.press_title,
      press_content: this.editPressForm.press_content,
      press_source_link: this.editPressForm.press_source_link
    }
    
    this.backendService.update_press(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Press Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    })
  }

  //delete data
  deletePress(id: any): void{
    this.backendService.delete_press(id).subscribe({
      next: (res) => {
        this.submitted  = true;

        let message = `Successfully delete Press Data with ID: ${id}`;
        this.showToasterSuccess(message);
      }
    })
  }

  confirmBox(id: any){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deletePress(id);
        
        Swal.fire(
          'Deleted!',
          'Press has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Press Data is Safe',
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

  reloadPage(){
    this.getPressList();   
  }

  clearField(): void {
    this.submitted = false;
    this.pressList = {
      press_title: '',
      press_content: '',
      press_source_link: ''
    };
  }
}
