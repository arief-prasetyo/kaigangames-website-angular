import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreejslogoRoutingModule } from './threejslogo-routing.module';
import { ThreejslogoComponent } from './threejslogo.component';


@NgModule({
  declarations: [
    ThreejslogoComponent
  ],
  imports: [
    CommonModule,
    ThreejslogoRoutingModule
  ],
  exports: [
    ThreejslogoComponent
  ]
})
export class ThreejslogoModule { }
