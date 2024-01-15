import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsListComponent } from './contact-us-list.component';

const routes: Routes = [{ path: '', component: ContactUsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsListRoutingModule { }
