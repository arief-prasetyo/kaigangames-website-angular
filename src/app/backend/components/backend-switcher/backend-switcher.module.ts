import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendSwitcherRoutingModule } from './backend-switcher-routing.module';
import { BackendSwitcherComponent } from './backend-switcher.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    BackendSwitcherComponent
  ],
  imports: [
    CommonModule,
    BackendSwitcherRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    BackendSwitcherComponent
  ]
})
export class BackendSwitcherModule { }
