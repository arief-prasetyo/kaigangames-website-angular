import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurValuesRoutingModule } from './our-values-routing.module';
import { OurValuesComponent } from './our-values.component';


@NgModule({
  declarations: [
    OurValuesComponent
  ],
  imports: [
    CommonModule,
    OurValuesRoutingModule
  ],
  exports: [
    OurValuesComponent
  ]
})
export class OurValuesModule { }
