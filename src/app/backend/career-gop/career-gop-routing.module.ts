import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareerGOPComponent } from './career-gop.component';

const routes: Routes = [{ path: '', component: CareerGOPComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerGOPRoutingModule { }
