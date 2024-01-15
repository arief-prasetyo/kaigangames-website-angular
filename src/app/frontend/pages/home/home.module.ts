import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ThreejslogoModule } from '../../threejs/threejslogo/threejslogo.module';
import { FooterModule } from '../../components/footer/footer.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { PipeSharedModuleModule } from 'src/app/pipe/pipe-shared-module/pipe-shared-module.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ThreejslogoModule,
    SlickCarouselModule,
    FontAwesomeModule,
    PipeSharedModuleModule,
    NavbarModule,
    FooterModule
  ]
})
export class HomeModule { }
