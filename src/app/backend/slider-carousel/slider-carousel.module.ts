import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderCarouselRoutingModule } from './slider-carousel-routing.module';
import { SliderCarouselComponent } from './slider-carousel.component';


@NgModule({
  declarations: [
    SliderCarouselComponent
  ],
  imports: [
    CommonModule,
    SliderCarouselRoutingModule
  ]
})
export class SliderCarouselModule { }
