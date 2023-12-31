import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { ValidationComponent } from './validation/validation.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminComponent},
  {path: "profile", component: ProfileComponent},
  {path: "signup", component: SignUpComponent},
  {path: "game-details/:id", component: GameDetailsComponent},
  {path: "checkout", component: CheckoutComponent},
  {path: "Validation/:username", component: ValidationComponent},
  {path: "events", component: EventsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
