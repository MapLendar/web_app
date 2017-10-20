import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Router } from '@angular/router';

import { NguiMapModule} from '@ngui/map';

import { AppGlobals } from './app.settings'
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
import { SitesComponent } from './views/sites/sites.component';
import { InvitationsComponent } from './views/invitations/invitations.component';


import { UserService } from "./services/user.service";
import { SitesService } from "./services/sites.service";
import { EventServiceService } from './services/event-service.service';
import { UserProfileComponent } from './views/login/userprofile.component';

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
    EventosComponent,
    SitesComponent,
    InvitationsComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRouter,
    FormsModule,
    ReactiveFormsModule,
		NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC-f5ER_apawz40mq9fOyXchgZQiuiE_n8&libraries=visualization&callback=initMap'}),
    HttpModule
  ],
  providers: [
    AppGlobals,
    UserService, 
    EventServiceService,
    SitesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
