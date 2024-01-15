import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';
//pipes
import { PipeSharedModuleModule } from '../../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    NavbarModule,
    FooterModule,
    FontAwesomeModule,
    NgxPaginationModule,
    PipeSharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NewsModule { }
