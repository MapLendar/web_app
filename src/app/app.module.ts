import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRouter } from './routers/app.router';
import { HeaderComponent } from "./views/header/header.component";
import { FooterComponent } from "./views/footer/footer.component";
import { HomeComponent } from "./views/home/home.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { MapComponent } from "./views/map/map.component";
import { CalendarComponent } from "./views/calendar/calendar.component";

import { UserService } from "./services/user.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MapComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRouter
  ],
  providers: [
    UserService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
