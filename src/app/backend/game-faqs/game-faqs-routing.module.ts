import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameFaqsComponent } from './game-faqs.component';

const routes: Routes = [{ path: '', component: GameFaqsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameFaqsRoutingModule { }
