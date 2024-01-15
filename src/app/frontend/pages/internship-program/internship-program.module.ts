import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternshipProgramRoutingModule } from './internship-program-routing.module';
import { InternshipProgramComponent } from './internship-program.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SlickCarouselModule } from 'ngx-slick-carousel';
//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';
//pipes
import { PipeSharedModuleModule } from '../../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    InternshipProgramComponent
  ],
  imports: [
    CommonModule,
    InternshipProgramRoutingModule,
    NavbarModule,
    FooterModule,
    PipeSharedModuleModule,
    CarouselModule,
    SlickCarouselModule
  ]
})
export class InternshipProgramModule { }
