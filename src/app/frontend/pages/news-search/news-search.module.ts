import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsSearchRoutingModule } from './news-search-routing.module';
import { NewsSearchComponent } from './news-search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';
//pipes
import { PipeSharedModuleModule } from '../../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    NewsSearchComponent
  ],
  imports: [
    CommonModule,
    NewsSearchRoutingModule,
    NavbarModule,
    FooterModule,
    NgxPaginationModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    PipeSharedModuleModule
  ]
})
export class NewsSearchModule { }
