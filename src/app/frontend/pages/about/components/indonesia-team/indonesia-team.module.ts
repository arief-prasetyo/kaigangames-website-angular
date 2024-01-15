import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndonesiaTeamRoutingModule } from './indonesia-team-routing.module';
import { IndonesiaTeamComponent } from './indonesia-team.component';


@NgModule({
  declarations: [
    IndonesiaTeamComponent
  ],
  imports: [
    CommonModule,
    IndonesiaTeamRoutingModule
  ],
  exports: [
    IndonesiaTeamComponent
  ]
})
export class IndonesiaTeamModule { }
