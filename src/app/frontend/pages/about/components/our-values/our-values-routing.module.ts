import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurValuesComponent } from './our-values.component';

const routes: Routes = [{ path: '', component: OurValuesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurValuesRoutingModule { }
