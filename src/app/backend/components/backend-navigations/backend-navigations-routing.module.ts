import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackendNavigationsComponent } from './backend-navigations.component';

const routes: Routes = [{ path: '', component: BackendNavigationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendNavigationsRoutingModule { }
