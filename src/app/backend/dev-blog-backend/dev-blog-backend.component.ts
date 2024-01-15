import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//services
import { TokenStorageService } from '../../services/token-storage.service';
import { BackendService } from "../../services/backend.service";
import { ToastNotificationService } from '../../services/toast-notification.service';
//model
import { DevBlogTab } from "../../models/backend/dev-blog-tab.model";
import { DevBlog } from "../../models/backend/dev-blog.model";
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-dev-blog-backend',
  templateUrl: './dev-blog-backend.component.html',
  styleUrls: ['./dev-blog-backend.component.sass']
})
export class DevBlogBackendComponent {
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
  DevBlogData?: DevBlog[];
  DBTData?: DevBlogTab[];
  //form
  DevBlogList: DevBlog = {
    devblog_title: '',
    devblog_content: '',
    devblog_source:'',
    devblog_source_link: '',
    tab_data_target: '',
    createdAt: ''
  };
  editDevBlogForm: DevBlog = new DevBlog();

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
    this.getDevBlog();
    this.getDevBlogTabData();

    $("#devblog_source, #devblog_source_1").change(function(){
      var selectedData = $(this).children("option:selected").val();
      if(selectedData == 'external'){
        $(".SL").css('display', 'block');
      } else {
        $(".SL").css('display', 'none');
      }
  });
    
  }

  getDevBlogTabData(): void{
    this.backendService.get_devBlogTab().subscribe({
      next: (data) => {
        this.DBTData = data;
        console.log(data)
      },
      error: (e) => console.error(e)
    })
  }

  getDevBlog(){
    this.backendService.get_devBlog().subscribe({
      next: (data) => {
        this.DevBlogData = data;
        console.log(data)
        
        setTimeout(()=>{   
          $('#devblogtable').DataTable( {
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
      devblog_title: this.DevBlogList.devblog_title,
      devblog_content: this.DevBlogList.devblog_content,
      devblog_source: this.DevBlogList.devblog_source,
      devblog_source_link: this.DevBlogList.devblog_source_link,
      tab_data_target: this.DevBlogList.tab_data_target
    }

    this.backendService.create_devBlog(data).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully create Dev Blog Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    });
    this.clearField();
  }

  editData(id: any): void{
    this.backendService.edit_devBlog(id).subscribe((data:any) => {
      this.editDevBlogForm.id = data.id;
      this.editDevBlogForm.devblog_title = data.devblog_title;
      this.editDevBlogForm.devblog_content = data.devblog_content;
      this.editDevBlogForm.devblog_source = data.devblog_source;
      this.editDevBlogForm.devblog_source_link = data.devblog_source_link;
      this.editDevBlogForm.tab_data_target = data.tab_data_target;

      this.id = data.id;
    })
  }

  updateData(id: any): void {
    const editData = {
      devblog_title: this.editDevBlogForm.devblog_title,
      devblog_content: this.editDevBlogForm.devblog_content,
      devblog_source: this.editDevBlogForm.devblog_source,
      devblog_source_link: this.editDevBlogForm.devblog_source_link,
      tab_data_target: this.editDevBlogForm.tab_data_target,
    }

    this.backendService.update_devBlog(id, editData).subscribe({
      next: (res) => {
        this.submitted = true;
        let message = "Successfully Update Dev Blog Data.";
        this.showToasterSuccess(message)
      },
      error: (e) => console.error(e)
    })
  }

  deleteData(id: any): void{
    this.backendService.delete_devBlog(id).subscribe({
      next: (res) => {
        this.submitted  = true;

        let message = `Successfully delete Dev Blog Data with ID: ${id}`;
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
          'Dev Blog has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Dev Blog Data is Safe',
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
    this.getDevBlog();   
  }

  clearField(): void {
    this.submitted = false;
    this.DevBlogList = {
      devblog_title: '',
      devblog_content: '',
      devblog_source: '',
      devblog_source_link: '',
      tab_data_target: ''
    };
  }
}
