import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerLifeAtKaiganRoutingModule } from './career-life-at-kaigan-routing.module';
import { CareerLifeAtKaiganComponent } from './career-life-at-kaigan.component';


@NgModule({
  declarations: [
    CareerLifeAtKaiganComponent
  ],
  imports: [
    CommonModule,
    CareerLifeAtKaiganRoutingModule
  ]
})
export class CareerLifeAtKaiganModule { }
