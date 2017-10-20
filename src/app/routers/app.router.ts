import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "../views/home/home.component";
import { LoginComponent } from "../views/login/login.component";
import { RegisterComponent } from "../views/register/register.component";
import { MapComponent } from "../views/map/map.component";
import { CreateEventComponent } from "../views/create-event/create-event.component";
import { SitesComponent } from "../views/sites/sites.component";
import { EventosComponent } from "../views/eventos/eventos.component";
import { InvitationsComponent } from "../views/invitations/invitations.component";


//import { PageNotFoundComponent }    from './not-found.component';

import { SelectivePreloadingStrategy } from "../strategies/selective-preloading.strategy";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'events',
    component: CreateEventComponent
  },
  {
    path: 'sites',
    component: SitesComponent
  },
  {
    path: 'myEvents',
    component: EventosComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'myInvitations',
    component: InvitationsComponent
  },
  { path: '',   redirectTo: '', pathMatch: 'full' }
//  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: true, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategy,

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    //CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRouter { }
