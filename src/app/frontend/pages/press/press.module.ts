import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PressRoutingModule } from './press-routing.module';
import { PressComponent } from './press.component';
//components
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    PressComponent
  ],
  imports: [
    CommonModule,
    PressRoutingModule,
    NavbarModule,
    FooterModule,
  ]
})
export class PressModule { }
