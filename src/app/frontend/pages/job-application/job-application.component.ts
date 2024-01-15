import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
//service
import { BackendService } from "../../../services/backend.service";
import { ToastNotificationService } from '../../../services/toast-notification.service';
//model
import { JobApplication } from '../../../models/backend/job-application.model';
import { CareerOpenPosition } from '../../../models/backend/career-open-position.model';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.sass']
})
export class JobApplicationComponent {
  id: number | undefined;
  //form
  JobApplication: JobApplication = {
    group_position: '',
    job_title: '',
    job_location: '',
    resume_file: '',
    resume_path:'',
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
  detailOpenPosition: CareerOpenPosition = new CareerOpenPosition();
  //image
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  imageInfos?: Observable<any>;

  constructor(private route: ActivatedRoute, 
    private backendService: BackendService, 
    private toastService: ToastNotificationService,
    private ngxFavicon: AngularFaviconService){}

  ngOnInit() {
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
    $('body').removeClass("bg-theme2");
    this.id = this.route.snapshot.params['id'];
    this.jobVacancyDetail();
  }

  jobVacancyDetail(): void{
    this.backendService.edit_OpenPosition(this.id).subscribe((data: any) => {
      this.detailOpenPosition.id = data.id;
      this.detailOpenPosition.job_title = data.job_title;
      this.detailOpenPosition.job_location = data.job_location;
      this.detailOpenPosition.group_position = data.group_position;
      this.detailOpenPosition.type_of_work_contract = data.type_of_work_contract;
      this.detailOpenPosition.image_file = data.image_file;
      this.detailOpenPosition.about_kaigangames = data.about_kaigangames;
      this.detailOpenPosition.job_role = data.job_role;
      this.detailOpenPosition.job_responsibilities = data.job_responsibilities;
      this.detailOpenPosition.job_requirement = data.job_requirement;
      this.detailOpenPosition.job_requirement_bonus_point = data.job_requirement_bonus_point;
      this.detailOpenPosition.job_benefits_and_perks = data.job_benefits_and_perks;
      this.detailOpenPosition.current_project = data.current_project;
      this.detailOpenPosition.footer = data.footer;
    })
  }

  onSubmit(): void{
    //game image remove fakepath
    let resumeFile = this.JobApplication.resume_file;
    let resumeName = resumeFile.replace("C:\\fakepath\\", "");
    let resumeWithTimestamp = this.JobApplication.email+'_'+resumeName;
    const data = {
      group_position: this.detailOpenPosition.group_position,
      job_title: this.detailOpenPosition.job_title,
      job_location: this.detailOpenPosition.job_location,
      resume_file: resumeWithTimestamp,
      resume_path: '/assets/resources/uploads/job-applicant/'+resumeWithTimestamp,
      cover_letter: this.JobApplication.cover_letter,
      first_name: this.JobApplication.first_name,
      last_name: this.JobApplication.last_name,
      email: this.JobApplication.email,
      phone: this.JobApplication.phone,
      street_address: this.JobApplication.street_address,
      city: this.JobApplication.city,
      state_or_province: this.JobApplication.state_or_province,
      zip_code: this.JobApplication.zip_code,
      country: this.JobApplication.country,
      linkedIn_profile: this.JobApplication.linkedIn_profile,
      hear_us_from: this.JobApplication.hear_us_from,
      gender: this.JobApplication.gender,
      race: this.JobApplication.race,
    };
    
    this.backendService.send_JobApplication(data)
    .subscribe({
      next: (res) => {
        this.submitted = true;

        let message = "Thank You. We will let you know as soon as possible";
        this.showToasterSuccess(message);
        this.uploadFile(this.JobApplication.email+'_'+resumeName);
      },
      error: (e) => console.error(e)
    });
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
          console.log(e.target.result);
          this.preview = e.target.result;
        };
  
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  uploadFile(filename: any): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.backendService.uploadResumeFile(this.currentFile, filename).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.imageInfos = this.backendService.getResumeFile();
            }
          },
          error: (err: any) => {
            console.log(err);
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

  //notification
  showToasterSuccess(msg: string | undefined){
    this.toastService.showSuccess(msg, "Success");
    setTimeout(() => {
      this.reloadPage()
    }, 2500);
  }

  reloadPage():void{
    location.reload();
  }
}
