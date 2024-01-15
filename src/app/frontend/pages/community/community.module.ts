import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';
//pipes
import { PipeSharedModuleModule } from '../../../pipe/pipe-shared-module/pipe-shared-module.module';

@NgModule({
  declarations: [
    CommunityComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    NavbarModule,
    FooterModule,
    PipeSharedModuleModule
  ]
})
export class CommunityModule { }
