import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendFooterRoutingModule } from './backend-footer-routing.module';
import { BackendFooterComponent } from './backend-footer.component';


@NgModule({
  declarations: [
    BackendFooterComponent
  ],
  imports: [
    CommonModule,
    BackendFooterRoutingModule
  ],
  exports: [
    BackendFooterComponent
  ]
})
export class BackendFooterModule { }
