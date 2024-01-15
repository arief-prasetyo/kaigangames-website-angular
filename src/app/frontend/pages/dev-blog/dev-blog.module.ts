import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevBlogRoutingModule } from './dev-blog-routing.module';
import { DevBlogComponent } from './dev-blog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TabViewModule } from 'primeng/tabview';
//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';
//pipes
import { PipeSharedModuleModule } from '../../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    DevBlogComponent
  ],
  imports: [
    CommonModule,
    DevBlogRoutingModule,
    NavbarModule,
    FooterModule,
    NgxPaginationModule,
    PipeSharedModuleModule,
    TabViewModule
  ]
})
export class DevBlogModule { }
