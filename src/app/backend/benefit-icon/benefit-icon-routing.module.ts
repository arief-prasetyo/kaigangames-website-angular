import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenefitIconComponent } from './benefit-icon.component';

const routes: Routes = [{ path: '', component: BenefitIconComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BenefitIconRoutingModule { }
