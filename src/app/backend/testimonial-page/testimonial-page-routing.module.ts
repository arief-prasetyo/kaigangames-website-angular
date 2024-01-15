import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestimonialPageComponent } from './testimonial-page.component';

const routes: Routes = [{ path: '', component: TestimonialPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestimonialPageRoutingModule { }
