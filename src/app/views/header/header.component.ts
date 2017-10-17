import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AppGlobals } from '../../app.settings';


import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  constructor (public app: AppGlobals, private userService: UserService, private router: Router )  {
  }
  
  private logout(): void{
    console.log(this.userService.logOut().subscribe(
      data => {
        if(data){
          this.router.navigate( [''] );
        }
      },
      err => console.log(err)
    ));
  }
}
