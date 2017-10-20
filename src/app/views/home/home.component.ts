import { Component } from '@angular/core';
import { AppGlobals } from '../../app.settings';
import { UserService } from '../../services/user.service';
import { UserProfileComponent } from '../login/userprofile.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  constructor (public app: AppGlobals)  {
    
  }
}
