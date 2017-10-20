import { Component, OnInit, Input, OnChanges, SimpleChange  } from '@angular/core';
import { SitesService } from '../../services/sites.service';
import { EventServiceService } from '../../services/event-service.service'; 
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.sass']
})
export class EventosComponent implements OnInit {
  @Input('selectedSiteId') selectedSiteId: number;
  events: any;
  
    constructor(private userService: UserService, private eventsService: EventServiceService)
    {
      this.events = [
      ];
    }

    toDay (dateTime) {   
      var dateTime = dateTime.split("T");//dateTime[0] = date, dateTime[1] = time
      var date = dateTime[0].split("-");
      // var time = dateTime[1].split(":"); 
      //(year, month, day, hours, minutes, seconds, milliseconds)
      return date[1];
    
    }

    toMonth (dateTime) {   
      var dateTime = dateTime.split("T");//dateTime[0] = date, dateTime[1] = time
      var date = dateTime[0].split("-");
      // var time = dateTime[1].split(":"); 
      //(year, month, day, hours, minutes, seconds, milliseconds)
      var months = ["Enero", "Feb", "Marzo", "Abril", "Mayo", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"]
      return months[date[2]-1];
    
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
      let log: string[] = [];
      for (let propName in changes) {
        let changedProp = changes[propName];
        this.eventsService.eventsBySite(this.selectedSiteId).subscribe(
          data => {
            if(data){
              this.events = data.json().events;
              this.userService.refreshToken(data.json().token);
            }
          },
          err => console.log(err)
        )
      }
    }
  
    ngOnInit() {
      if(this.selectedSiteId){
        this.eventsService.eventsBySite(this.selectedSiteId).subscribe(
          data => {
            if(data){
              this.events = data.json().events;
              this.userService.refreshToken(data.json().token);
            }
          },
          err => console.log(err)
        )
      }else{
        this.eventsService.myEvents().subscribe(
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
}
