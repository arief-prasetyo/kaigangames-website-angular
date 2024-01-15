import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevBlogDetailRoutingModule } from './dev-blog-detail-routing.module';
import { DevBlogDetailComponent } from './dev-blog-detail.component';
//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';
//pipes
import { PipeSharedModuleModule } from '../../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    DevBlogDetailComponent
  ],
  imports: [
    CommonModule,
    DevBlogDetailRoutingModule,
    NavbarModule,
    FooterModule,
    PipeSharedModuleModule
  ]
})
export class DevBlogDetailModule { }
