import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifeAtKaiganRoutingModule } from './life-at-kaigan-routing.module';
import { LifeAtKaiganComponent } from './life-at-kaigan.component';
import { LightgalleryModule } from 'lightgallery/angular';
//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';
//pipes
import { PipeSharedModuleModule } from '../../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    LifeAtKaiganComponent
  ],
  imports: [
    CommonModule,
    LifeAtKaiganRoutingModule,
    NavbarModule,
    FooterModule,
    PipeSharedModuleModule,
    LightgalleryModule
  ]
})
export class LifeAtKaiganModule { }
