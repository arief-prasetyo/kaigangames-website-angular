import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutTeamImageComponent } from './about-team-image.component';

const routes: Routes = [{ path: '', component: AboutTeamImageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutTeamImageRoutingModule { }
