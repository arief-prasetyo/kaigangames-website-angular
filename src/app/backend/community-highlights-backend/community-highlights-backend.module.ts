import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityHighlightsBackendRoutingModule } from './community-highlights-backend-routing.module';
import { CommunityHighlightsBackendComponent } from './community-highlights-backend.component';
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
    CommunityHighlightsBackendComponent
  ],
  imports: [
    CommonModule,
    CommunityHighlightsBackendRoutingModule,
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
export class CommunityHighlightsBackendModule { }
