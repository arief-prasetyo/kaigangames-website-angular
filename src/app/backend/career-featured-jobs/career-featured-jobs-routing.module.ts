import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareerFeaturedJobsComponent } from './career-featured-jobs.component';

const routes: Routes = [{ path: '', component: CareerFeaturedJobsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerFeaturedJobsRoutingModule { }
