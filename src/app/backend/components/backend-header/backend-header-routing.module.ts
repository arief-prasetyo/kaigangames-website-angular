import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackendHeaderComponent } from './backend-header.component';

const routes: Routes = [{ path: '', component: BackendHeaderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendHeaderRoutingModule { }
