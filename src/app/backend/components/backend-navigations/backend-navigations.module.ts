import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendNavigationsRoutingModule } from './backend-navigations-routing.module';
import { BackendNavigationsComponent } from './backend-navigations.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [
    BackendNavigationsComponent
  ],
  imports: [
    CommonModule,
    BackendNavigationsRoutingModule,
    FontAwesomeModule
    // PerfectScrollbarModule
  ],
  exports: [
    BackendNavigationsComponent
  ]
})
export class BackendNavigationsModule { }
