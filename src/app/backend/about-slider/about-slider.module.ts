import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutSliderRoutingModule } from './about-slider-routing.module';
import { AboutSliderComponent } from './about-slider.component';
import { BackendFooterModule } from '../components/backend-footer/backend-footer.module';
import { BackendHeaderModule } from '../components/backend-header/backend-header.module';
import { BackendNavigationsModule } from '../components/backend-navigations/backend-navigations.module';
import { BackendSwitcherModule } from '../components/backend-switcher/backend-switcher.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
//pipes
import { PipeSharedModuleModule } from '../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    AboutSliderComponent
  ],
  imports: [
    CommonModule,
    AboutSliderRoutingModule,
    BackendFooterModule,
    BackendHeaderModule,
    BackendNavigationsModule,
    BackendSwitcherModule,
    FontAwesomeModule,
    PipeSharedModuleModule,
    EditorModule,
    FormsModule, 
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class AboutSliderModule { }
