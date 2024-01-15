import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareerLifeAtKaiganComponent } from './career-life-at-kaigan.component';

const routes: Routes = [{ path: '', component: CareerLifeAtKaiganComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerLifeAtKaiganRoutingModule { }
