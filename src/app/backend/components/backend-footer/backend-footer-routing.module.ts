import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackendFooterComponent } from './backend-footer.component';

const routes: Routes = [{ path: '', component: BackendFooterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendFooterRoutingModule { }
