import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobVacancyDetailComponent } from './job-vacancy-detail.component';

const routes: Routes = [{ path: '', component: JobVacancyDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobVacancyDetailRoutingModule { }
