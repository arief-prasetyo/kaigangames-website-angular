import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityHighlightComponent } from './community-highlight.component';

const routes: Routes = [{ path: '', component: CommunityHighlightComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityHighlightRoutingModule { }
