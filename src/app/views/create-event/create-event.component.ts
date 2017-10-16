import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../../services/event-service.service'; 
import { Http, Request, RequestMethod, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass']
})
export class CreateEventComponent implements OnInit {

  constructor(
     private eventServiceService: EventServiceService,
     private http: Http	
  ) { }

  ngOnInit() {
  }
  
  createEvent(owner_id, site_id) {
      this.eventServiceService.createEvent(owner_id, site_id).subscribe(res => {
      console.log(res)
   })
  }
  	
}
