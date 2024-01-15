import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityHighlightsSectionComponent } from './community-highlights-section.component';

const routes: Routes = [{ path: '', component: CommunityHighlightsSectionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityHighlightsSectionRoutingModule { }
