import { Component, OnInit } from '@angular/core';
import { SitesService } from '../../services/sites.service';
import { EventServiceService } from '../../services/event-service.service'; 
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.sass']
})
export class EventosComponent implements OnInit {

  events: any;
  
    constructor(private userService: UserService, private eventsService: EventServiceService)
    {
      this.events = [
        // {description:"12345", name:"nameaa"},
        // {description:"12345", name:"nameaa"}
      ];
    }
  
    ngOnInit() {
      this.eventsService.events().subscribe(
        data => {
          if(data){
            this.events = data.json().events;
            this.eventsService.setEvents(this.events);
            this.userService.refreshToken(data.json().token);
          }
        },
        err => console.log(err)
      )
    }
}
