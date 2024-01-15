import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliderCarouselComponent } from './slider-carousel.component';

const routes: Routes = [{ path: '', component: SliderCarouselComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SliderCarouselRoutingModule { }
