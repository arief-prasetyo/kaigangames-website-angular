import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BackendFooterModule } from '../components/backend-footer/backend-footer.module';
import { BackendHeaderModule } from '../components/backend-header/backend-header.module';
import { BackendSwitcherModule } from '../components/backend-switcher/backend-switcher.module';
import { BackendNavigationsModule } from '../components/backend-navigations/backend-navigations.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipeSharedModuleModule } from 'src/app/pipe/pipe-shared-module/pipe-shared-module.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BackendNavigationsModule,
    BackendHeaderModule,
    BackendFooterModule,
    BackendSwitcherModule,
    FontAwesomeModule,
    PipeSharedModuleModule,
    EditorModule,
    FormsModule, 
    ReactiveFormsModule,
    DataTablesModule,
  ]
})
export class DashboardModule { }