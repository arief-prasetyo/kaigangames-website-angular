import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//services
import { TokenStorageService } from '../../services/token-storage.service';
import { BackendService } from "../../services/backend.service";
import { ToastNotificationService } from '../../services/toast-notification.service';
//model
import { DevBlogTab } from "../../models/backend/dev-blog-tab.model";
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-dev-blog-tabs',
  templateUrl: './dev-blog-tabs.component.html',
  styleUrls: ['./dev-blog-tabs.component.sass']
})
export class DevBlogTabsComponent {
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
  DBTData?: DevBlogTab[];
  //form
  DBTList: DevBlogTab = {
    tab_title: '',
    tab_description: '',
    tab_data_target:'',
    createdAt: ''
  };
  editDBTForm: DevBlogTab = new DevBlogTab();

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
    this.getDevBlogTabData();
  }

  getDevBlogTabData(): void{
    this.backendService.get_devBlogTab().subscribe({
      next: (data) => {
        this.DBTData = data;
        // console.log(data)
        
        setTimeout(()=>{   
          $('#devblogtabtable').DataTable( {
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
      tab_title: this.DBTList.tab_title,
      tab_description: this.DBTList.tab_description,
      tab_data_target: this.DBTList.tab_data_target
    }

    this.backendService.create_devBlogTab(data).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully create Dev Blog Tab Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    });
    this.clearField();
  }

  editData(id: any): void{
    this.backendService.edit_devBlogTab(id).subscribe((data:any) => {
      this.editDBTForm.id = data.id;
      this.editDBTForm.tab_title = data.tab_title;
      this.editDBTForm.tab_description = data.tab_description;
      this.editDBTForm.tab_data_target = data.tab_data_target;

      this.id = data.id;
    })
  }

  updateData(id: any): void {
    const editData = {
      tab_title: this.editDBTForm.tab_title,
      tab_description: this.editDBTForm.tab_description,
      tab_data_target: this.editDBTForm.tab_data_target
    }

    this.backendService.update_devBlogTab(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Dev Blog Tab Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    })
  }

  deleteData(id: any): void{
    this.backendService.delete_devBlogTab(id).subscribe({
      next: (res) => {
        this.submitted  = true;

        let message = `Successfully delete Dev Blog Tab Data with ID: ${id}`;
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
        this.deleteData(id);
        
        Swal.fire(
          'Deleted!',
          'Dev Blog Tab has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Dev Blog Tab Data is Safe',
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
    this.getDevBlogTabData();   
  }

  clearField(): void {
    this.submitted = false;
    this.DBTList = {
      tab_title: '',
      tab_description: '',
      tab_data_target: ''
    };
  }
}
