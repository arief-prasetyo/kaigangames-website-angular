import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';
//pipes
import { PipeSharedModuleModule } from '../../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    NavbarModule,
    FooterModule,
    PipeSharedModuleModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContactModule { }
