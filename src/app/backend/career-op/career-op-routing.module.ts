import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareerOPComponent } from './career-op.component';

const routes: Routes = [{ path: '', component: CareerOPComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerOPRoutingModule { }
