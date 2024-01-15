import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndonesiaTeamComponent } from './indonesia-team.component';

const routes: Routes = [{ path: '', component: IndonesiaTeamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndonesiaTeamRoutingModule { }
