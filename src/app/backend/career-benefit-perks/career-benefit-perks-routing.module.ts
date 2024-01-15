import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareerBenefitPerksComponent } from './career-benefit-perks.component';

const routes: Routes = [{ path: '', component: CareerBenefitPerksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerBenefitPerksRoutingModule { }
