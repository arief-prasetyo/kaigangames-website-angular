import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutBackendComponent } from './about-backend.component';

const routes: Routes = [{ path: '', component: AboutBackendComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutBackendRoutingModule { }
