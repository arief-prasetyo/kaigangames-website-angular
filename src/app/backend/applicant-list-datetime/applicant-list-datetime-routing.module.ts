import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantListDatetimeComponent } from './applicant-list-datetime.component';

const routes: Routes = [{ path: '', component: ApplicantListDatetimeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantListDatetimeRoutingModule { }
