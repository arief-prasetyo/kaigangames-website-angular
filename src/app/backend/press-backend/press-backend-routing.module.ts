import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PressBackendComponent } from './press-backend.component';

const routes: Routes = [{ path: '', component: PressBackendComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PressBackendRoutingModule { }
