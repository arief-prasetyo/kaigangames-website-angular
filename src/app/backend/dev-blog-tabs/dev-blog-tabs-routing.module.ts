import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevBlogTabsComponent } from './dev-blog-tabs.component';

const routes: Routes = [{ path: '', component: DevBlogTabsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevBlogTabsRoutingModule { }
