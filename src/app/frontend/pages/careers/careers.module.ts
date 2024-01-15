import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareersRoutingModule } from './careers-routing.module';
import { CareersComponent } from './careers.component';
//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';
//pipes
import { PipeSharedModuleModule } from '../../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    CareersComponent
  ],
  imports: [
    CommonModule,
    CareersRoutingModule,
    NavbarModule,
    FooterModule,
    PipeSharedModuleModule
  ]
})
export class CareersModule { }
