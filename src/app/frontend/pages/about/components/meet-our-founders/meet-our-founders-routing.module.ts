import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetOurFoundersComponent } from './meet-our-founders.component';

const routes: Routes = [{ path: '', component: MeetOurFoundersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetOurFoundersRoutingModule { }
