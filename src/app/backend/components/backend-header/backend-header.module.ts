import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendHeaderRoutingModule } from './backend-header-routing.module';
import { BackendHeaderComponent } from './backend-header.component';


@NgModule({
  declarations: [
    BackendHeaderComponent
  ],
  imports: [
    CommonModule,
    BackendHeaderRoutingModule,
  ],
  exports: [
    BackendHeaderComponent
  ]
})
export class BackendHeaderModule { }
