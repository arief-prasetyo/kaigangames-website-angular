import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutTeamImageRoutingModule } from './about-team-image-routing.module';
import { AboutTeamImageComponent } from './about-team-image.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PipeSharedModuleModule } from 'src/app/pipe/pipe-shared-module/pipe-shared-module.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BackendSwitcherModule } from '../components/backend-switcher/backend-switcher.module';
import { BackendNavigationsModule } from '../components/backend-navigations/backend-navigations.module';
import { BackendHeaderModule } from '../components/backend-header/backend-header.module';
import { BackendFooterModule } from '../components/backend-footer/backend-footer.module';


@NgModule({
  declarations: [
    AboutTeamImageComponent
  ],
  imports: [
    CommonModule,
    AboutTeamImageRoutingModule,
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
export class AboutTeamImageModule { }
