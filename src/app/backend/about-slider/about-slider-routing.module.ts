import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutSliderComponent } from './about-slider.component';

const routes: Routes = [{ path: '', component: AboutSliderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutSliderRoutingModule { }
