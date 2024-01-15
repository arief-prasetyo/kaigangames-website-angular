import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobApplicationRoutingModule } from './job-application-routing.module';
import { JobApplicationComponent } from './job-application.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';
//pipes
import { PipeSharedModuleModule } from '../../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    JobApplicationComponent
  ],
  imports: [
    CommonModule,
    JobApplicationRoutingModule,
    NavbarModule,
    FooterModule,
    PipeSharedModuleModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class JobApplicationModule { }
