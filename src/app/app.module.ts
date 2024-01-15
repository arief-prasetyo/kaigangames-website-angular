import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { httpInterceptorProviders } from './helper/http-request.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery'
import { environment } from '../environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    PhotoGalleryModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgxPaginationModule,
    TabViewModule
  ],
  providers: [
    DatePipe,
    {
      provide: LocationStrategy, 
      useClass: PathLocationStrategy
    },
    httpInterceptorProviders,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
