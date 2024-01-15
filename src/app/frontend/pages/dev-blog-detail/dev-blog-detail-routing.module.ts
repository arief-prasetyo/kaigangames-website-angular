import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevBlogDetailComponent } from './dev-blog-detail.component';

const routes: Routes = [{ path: '', component: DevBlogDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevBlogDetailRoutingModule { }
