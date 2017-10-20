import { Component } from '@angular/core';
import { EventServiceService } from '../../services/event-service.service'; 
import { UserService } from '../../services/user.service';

import { OnInit } from '@angular/core';


@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.sass'],
})

export class InvitationsComponent implements OnInit{
  events: any;
  invitations: any;

  constructor(private userService: UserService, private eventsService: EventServiceService)
	{
		this.events = [
      // {image: "http://1.bp.blogspot.com/-pGhcdlb6f-4/U2b4BLo4v9I/AAAAAAAAIvo/V1bQLXkypnM/s1600/1-nuevo-edificio-facultad-enfermeria-campus-UNAL-sede-bogota.jpg", description:"12345", name:"nameaa"},
      // {image: "http://1.bp.blogspot.com/-pGhcdlb6f-4/U2b4BLo4v9I/AAAAAAAAIvo/V1bQLXkypnM/s1600/1-nuevo-edificio-facultad-enfermeria-campus-UNAL-sede-bogota.jpg", description:"12345", name:"nameaa"}
    ];

    this.invitations = [{"event_id": 4, "status": 0}];

  }

  eventName(id){
    for (var i=0; i < this.events.length; i++){
      if(this.events[i].id === id){
        return this.events[i].name;
      }
    }
  }

  eventDescription(id){
    for (var i=0; i < this.events.length; i++){
      if(this.events[i].id === id){
        return this.events[i].description;
      }
    }
  }

  confirmInvitation(eventId){
    this.eventsService.confirmStatus(eventId, 2).subscribe(
      data => {
        if(data){
          // this.invitations = data.json().response.objects;
          // this.sitesService.setSites(this.sites);
          this.userService.refreshToken(data.json().token);
        }
      },
      err => console.log(err)
    )
  }

  ngOnInit() {
    this.eventsService.getMyInvitations().subscribe(
      data => {
        if(data){
          this.invitations = data.json().response.objects;
          // this.sitesService.setSites(this.sites);
          this.userService.refreshToken(data.json().token);
        }
        this.eventsService.events().subscribe(
          data => {
            if(data){
              this.events = data.json().events;
              this.userService.refreshToken(data.json().token);
            }
          },
          err => console.log(err)
        )
        
      },
      err => console.log(err)
    )
    
    
  }
}
