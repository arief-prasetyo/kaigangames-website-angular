import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreejslogoComponent } from './threejslogo.component';

const routes: Routes = [{ path: '', component: ThreejslogoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreejslogoRoutingModule { }
