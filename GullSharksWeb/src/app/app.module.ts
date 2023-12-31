import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule } from 'ng-recaptcha';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import jQuery from 'jquery';

import {
  RECAPTCHA_SETTINGS,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminComponent } from './admin/admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ValidationComponent } from './validation/validation.component';
import { OffcanvasComponent } from './offcanvas/offcanvas.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { GameRecommendationsComponent } from './game-recommendations/game-recommendations.component';
import { ShareModule } from 'ngx-sharebuttons';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { EventsComponent } from './events/events.component';

const globalSettings: RecaptchaSettings = { siteKey: '6LcOuyYTAAAAAHTjFuqhA52fmfJ_j5iFk5PsfXaU' };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    AdminComponent,
    NavbarComponent,
    ProfileComponent,
    ValidationComponent,
    OffcanvasComponent,
    GameDetailsComponent,
    CheckoutComponent,
    GameRecommendationsComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ShareModule,
    BrowserAnimationsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    NgSelectModule,
    CarouselModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: globalSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
