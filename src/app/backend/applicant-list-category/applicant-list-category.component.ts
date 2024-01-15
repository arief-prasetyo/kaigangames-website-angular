import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { FormBuilder, FormGroup } from '@angular/forms';
//services
import { TokenStorageService } from '../../services/token-storage.service';
import { BackendService } from "../../services/backend.service";
import { ToastNotificationService } from '../../services/toast-notification.service';
//model
import { JobApplication } from "../../models/backend/job-application.model";
import { CareerGroupOpenPosition } from '../../models/backend/career-group-open-position.model';
//fontawesome
import { faCog, faChevronRight, faMoneyBillWave, faPlusCircle, faPencilAlt, faTrashAlt, faHomeAlt, faSearch, faFileExcel, faFileZipper, faCalendarDays, faSearchPlus} from '@fortawesome/free-solid-svg-icons'; 
import { faSlideshare} from '@fortawesome/free-brands-svg-icons'; 
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-applicant-list-category',
  templateUrl: './applicant-list-category.component.html',
  styleUrls: ['./applicant-list-category.component.sass']
})
export class ApplicantListCategoryComponent {
  editJobApplicationForm: JobApplication = new JobApplication();
  GroupOpenPositionData?: CareerGroupOpenPosition[];
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
  faFileExcel = faFileExcel;
  faFileZipper = faFileZipper;
  faCalendarDays = faCalendarDays;
  faSearchPlus = faSearchPlus;
  //form
  JobApplication: JobApplication = {
    job_title: '',
    job_location: '',
    resume_file: '',
    cover_letter: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    street_address: '',
    city: '',
    state_or_province: '',
    zip_code: '',
    country: '',
    linkedIn_profile: '',
    hear_us_from: '',
    gender: '',
    race: '',
    createdAt: ''
  };
  submitted = false;
  JobApplicationData?: JobApplication[];
  tagItems = [];
  //edit data
  id?: number;
  //login check
  isLoggedIn = false;
  isLoginFailed = false;
  zipFileReady = false;
  errorMessage = '';
  fileName= 'ApplicantList_'+new Date().getTime()+'.xlsx';
  blob: Blob | undefined;

  public userForm:FormGroup; // variable is created of type FormGroup is created
  category: string = ""; // Variable is created to show the input value below the button
  dataExist: boolean = false;
  selectedGOP: string | undefined;

  constructor(private backendService: BackendService,
    private storageService: TokenStorageService, 
    private router: Router, 
    private toastService: ToastNotificationService,
    private fb: FormBuilder,
    private ngxFavicon: AngularFaviconService){
      // Form element defined below
      this.userForm = this.fb.group({
        gop: '',
      });
  }

  ngOnInit(): void {
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      // const user = this.storageService.getUser();
    } else {
      this.router.navigate(['sign-in'])
    }

    this.retrieveGroupOpenPosition();
    this.checkZIP();
  }

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

  setValue() {
    this.category = this.userForm.get('gop')?.value; // input value retrieved
    this.selectedGOP = this.category; //save value
    
    this.backendService.getDataByGroupOpenPosition(this.category).subscribe({
      next: (data) => {
        this.JobApplicationData = data;
        
        if(data?.length > 0){
          this.dataExist = true;
        }

        setTimeout(()=>{   
          $('#datatableJobApp').DataTable( {
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


  checkZIP(): void{
    this.backendService.checkZIPByGroupOpenPosition().subscribe({
      next: (res) => {
        if(res.message == "The file not exist. You can generate new ZIP file"){
          //generate new zip file
          this.zipFileReady = false;
        } else {
          this.zipFileReady = true;
        }
      }
    })
  }

  makeaZIP(): void {
    this.showToasterInfo("Please wait, the system is creating the zip file");
    this.backendService.generateZIPByGroupOpenPosition(this.selectedGOP).subscribe((data) => {
      this.zipFileReady = true;
      this.showToasterSuccess(data.message);
    })
  }

  downloadZip(): void{
    this.showToasterInfo("Downloading files...");
    this.backendService.downloadZIPByGroupOpenPosition().subscribe(data => {
      let downloadURL = window.URL.createObjectURL(data);
      saveAs(downloadURL, "ResumeByGroupOpenPosition_"+this.selectedGOP+".zip");
    })
  }

  deleteZip(): void{
    this.backendService.deleteZIPByGroupOpenPosition('ResumeByGroupOpenPosition.zip').subscribe({
      next: (res) => {
        setTimeout(() => {
          this.submitted  = true;
          let message = `The last ZIP file deleted`;
          this.showToasterSuccess(message);
        }, 3500);
        this.checkZIP();
      }
    })
  }
  
  detailData(id: any):void{
    this.backendService.detail_JobApplication(id).subscribe((data) => {
      this.editJobApplicationForm.job_title = data.job_title;
      this.editJobApplicationForm.job_location = data.job_location;
      this.editJobApplicationForm.resume_file = data.resume_file;
      this.editJobApplicationForm.cover_letter = data.cover_letter;
      this.editJobApplicationForm.first_name = data.first_name;
      this.editJobApplicationForm.last_name = data.last_name;
      this.editJobApplicationForm.email = data.email;
      this.editJobApplicationForm.phone = data.phone;
      this.editJobApplicationForm.street_address = data.street_address;
      this.editJobApplicationForm.city = data.city;
      this.editJobApplicationForm.state_or_province = data.state_or_province;
      this.editJobApplicationForm.zip_code = data.zip_code;
      this.editJobApplicationForm.country = data.country;
      this.editJobApplicationForm.linkedIn_profile = data.linkedIn_profile;
      this.editJobApplicationForm.hear_us_from = data.hear_us_from;
      this.editJobApplicationForm.gender = data.gender;
      this.editJobApplicationForm.race = data.race;
      this.editJobApplicationForm.createdAt = data.createdAt;
      this.id = data.id
    })
  }

  //notification
  showToasterSuccess(msg: string | undefined){
    this.toastService.showSuccess(msg, "Success");
    setTimeout(() => {
      this.reloadPage()
    }, 2000);
  }

  showToasterInfo(msg: string | undefined){
    this.toastService.showInfo(msg, "Info");
    setTimeout(() => {
      this.reloadPage()
    }, 2000);
  }

  reloadPage(): void {
    this.setValue(); 
  }
}
