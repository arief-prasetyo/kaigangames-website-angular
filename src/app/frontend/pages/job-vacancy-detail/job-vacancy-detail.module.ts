import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobVacancyDetailRoutingModule } from './job-vacancy-detail-routing.module';
import { JobVacancyDetailComponent } from './job-vacancy-detail.component';
//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';
//pipes
import { PipeSharedModuleModule } from '../../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    JobVacancyDetailComponent
  ],
  imports: [
    CommonModule,
    JobVacancyDetailRoutingModule,
    NavbarModule,
    FooterModule,
    PipeSharedModuleModule,
  ]
})
export class JobVacancyDetailModule { }
