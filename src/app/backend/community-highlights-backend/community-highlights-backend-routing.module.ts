import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityHighlightsBackendComponent } from './community-highlights-backend.component';

const routes: Routes = [{ path: '', component: CommunityHighlightsBackendComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityHighlightsBackendRoutingModule { }
