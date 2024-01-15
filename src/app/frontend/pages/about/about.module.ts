import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';
import { MeetOurFoundersModule } from './components/meet-our-founders/meet-our-founders.module';
import { OurValuesModule } from './components/our-values/our-values.module';
import { IndonesiaTeamModule } from './components/indonesia-team/indonesia-team.module';
//pipes
import { PipeSharedModuleModule } from '../../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    NavbarModule,
    FooterModule,
    PipeSharedModuleModule,
    SlickCarouselModule,
    MeetOurFoundersModule,
    OurValuesModule,
    IndonesiaTeamModule,
    LazyLoadImageModule
  ]
})
export class AboutModule { }
