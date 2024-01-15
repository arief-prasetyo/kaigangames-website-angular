import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantListCategoryComponent } from './applicant-list-category.component';

const routes: Routes = [{ path: '', component: ApplicantListCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantListCategoryRoutingModule { }
