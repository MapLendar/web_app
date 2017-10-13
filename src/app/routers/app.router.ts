import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "../views/home/home.component";
import { LoginComponent } from "../views/login/login.component";
import { RegisterComponent } from "../views/register/register.component";
//import { PageNotFoundComponent }    from './not-found.component';

import { SelectivePreloadingStrategy } from "../strategies/selective-preloading.strategy";

const routes: Routes = [
  {
    path: 'home',
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
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
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