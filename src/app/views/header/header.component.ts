import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AppGlobals } from '../../app.settings';


import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  providers: [AppGlobals]
})
export class HeaderComponent {
  constructor (public app: AppGlobals, private userService: UserService, private router: Router )  {
  }
  
  public logout(): void{
    this.userService.logOut();
    this.router.navigate( ["/home"] );
  }
}
