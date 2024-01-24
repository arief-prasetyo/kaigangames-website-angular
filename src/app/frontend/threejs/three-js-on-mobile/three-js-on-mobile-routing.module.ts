import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreeJsOnMobileComponent } from './three-js-on-mobile.component';

const routes: Routes = [{ path: '', component: ThreeJsOnMobileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeJsOnMobileRoutingModule { }
