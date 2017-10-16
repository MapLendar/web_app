import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { Router } from '@angular/router';

import { EventServiceService } from './services/event-service.service';
import { AppComponent } from './app.component';
import { AppRouter } from './routers/app.router';
import { HeaderComponent } from "./views/header/header.component";
import { FooterComponent } from "./views/footer/footer.component";
import { HomeComponent } from "./views/home/home.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { MapComponent } from "./views/map/map.component";
import { CalendarComponent } from "./views/calendar/calendar.component";
import { CreateEventComponent } from './views/create-event/create-event.component';
import { EventosComponent } from './views/eventos/eventos.component';

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
    CalendarComponent,
    CreateEventComponent,
    EventosComponent
  ],
  imports: [
    BrowserModule,
    AppRouter,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    UserService, 
    EventServiceService	
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
