import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityHighlightRoutingModule } from './community-highlight-routing.module';
import { CommunityHighlightComponent } from './community-highlight.component';
//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';
//pipes
import { PipeSharedModuleModule } from '../../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    CommunityHighlightComponent
  ],
  imports: [
    CommonModule,
    CommunityHighlightRoutingModule,
    NavbarModule,
    FooterModule,
    PipeSharedModuleModule
  ]
})
export class CommunityHighlightModule { }
