import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetOurFoundersRoutingModule } from './meet-our-founders-routing.module';
import { MeetOurFoundersComponent } from './meet-our-founders.component';


@NgModule({
  declarations: [
    MeetOurFoundersComponent
  ],
  imports: [
    CommonModule,
    MeetOurFoundersRoutingModule
  ],
  exports: [
    MeetOurFoundersComponent
  ]
})
export class MeetOurFoundersModule { }
