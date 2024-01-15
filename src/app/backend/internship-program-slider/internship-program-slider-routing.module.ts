import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternshipProgramSliderComponent } from './internship-program-slider.component';

const routes: Routes = [{ path: '', component: InternshipProgramSliderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternshipProgramSliderRoutingModule { }
