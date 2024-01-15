import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//service
import { BackendService } from "../../../services/backend.service";
import { CareerOpenPosition } from '../../../models/backend/career-open-position.model';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-job-vacancy-detail',
  templateUrl: './job-vacancy-detail.component.html',
  styleUrls: ['./job-vacancy-detail.component.sass']
})
export class JobVacancyDetailComponent {
  editOpenPosition: CareerOpenPosition = new CareerOpenPosition();
  id: number | undefined;
  
  constructor(private route: ActivatedRoute, private backendService: BackendService, private ngxFavicon: AngularFaviconService){}

  ngOnInit() {
    this.ngxFavicon.setFavicon('../../../../assets/favicon/android-icon-48x48.png');
    $('body').removeClass("bg-theme2");
    this.id = this.route.snapshot.params['id'];
    this.jobVacancyDetail();
  }

  //detail data
  jobVacancyDetail(): void{
    this.backendService.edit_OpenPosition(this.id).subscribe((data: any) => {
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
    })
  }
}
