import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutBackendRoutingModule } from './about-backend-routing.module';
import { AboutBackendComponent } from './about-backend.component';
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
    AboutBackendComponent
  ],
  imports: [
    CommonModule,
    AboutBackendRoutingModule,
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
export class AboutBackendModule { }
