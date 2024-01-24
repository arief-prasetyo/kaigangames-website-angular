import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeJsOnMobileRoutingModule } from './three-js-on-mobile-routing.module';
import { ThreeJsOnMobileComponent } from './three-js-on-mobile.component';


@NgModule({
  declarations: [
    ThreeJsOnMobileComponent
  ],
  imports: [
    CommonModule,
    ThreeJsOnMobileRoutingModule
  ],
  exports: [
    ThreeJsOnMobileComponent
  ]
})
export class ThreeJsOnMobileModule { }
