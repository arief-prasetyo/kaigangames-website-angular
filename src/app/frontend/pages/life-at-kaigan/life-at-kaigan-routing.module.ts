import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifeAtKaiganComponent } from './life-at-kaigan.component';

const routes: Routes = [{ path: '', component: LifeAtKaiganComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifeAtKaiganRoutingModule { }
