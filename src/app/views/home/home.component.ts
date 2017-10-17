import { Component } from '@angular/core';
import { AppGlobals } from '../../app.settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [AppGlobals]
})
export class HomeComponent {
  constructor (public app: AppGlobals)  {
    
  }
}
