import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameVideoComponent } from './game-video.component';

const routes: Routes = [{ path: '', component: GameVideoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameVideoRoutingModule { }
