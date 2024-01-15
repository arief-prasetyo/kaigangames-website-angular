import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevBlogComponent } from './dev-blog.component';

const routes: Routes = [{ path: '', component: DevBlogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevBlogRoutingModule { }
