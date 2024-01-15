import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackendSwitcherComponent } from './backend-switcher.component';

const routes: Routes = [{ path: '', component: BackendSwitcherComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendSwitcherRoutingModule { }
