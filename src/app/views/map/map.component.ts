import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from '@angular/router';
import { Event } from "../../models/event.model";
import { Site } from "../../models/site.model";

import { UserService } from "../../services/user.service";
import { EventServiceService } from "../../services/event-service.service";
import { SitesService } from '../../services/sites.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass'],
	encapsulation: ViewEncapsulation.None
})

export class MapComponent  implements OnInit {
	map: any;
	circle: any;
	x: number = 4.636643;
  y: number = -74.083390;
  coords: any = { lat: this.x, lng: this.y };
	zoom: number = 15;
	scrollmap: boolean = false;
	events: Array<Event>;
  sites: Array<Site>;
	showUserProducts: boolean = false;
	errorMessage: string;
	loading: boolean = true;

	constructor( private userService: UserService,
		private eventService: EventServiceService,
		private siteService: SitesService,
		private router: Router )
	{
	  this.events = new Array<Event>();
	}

	ngOnInit()
	{
	  this.getSites();
		this.getEventList();
	}
	
	initMap(event: any) {
		this.map = event;
	}
	
	onResize(event) {
		this.map.setCenter(this.coords);
		let x1: number = 4.6316605616;
    let y1: number = -74.094350338;
    let coords1: any = {lat: x1, lng: y1};
    let x2: number = 4.645198782;
    let y2: number = -74.078836441;
    let coords2: any = {lat: x1, lng: y1};
		//this.map.fitBounds(coords1, coords2);
	}

	nearUserClicked(event: any, selectedEvent: Event){
		let marker = event;
		//this.getAllProductsForUser(selectedUser.id);
		//this.loading = true;
		//this.showUserProductsModal(true);
	}
	
	position(site_id): any{
	  console.log("Getting coodinates for site id: ", site_id);
	  let s = this.sites.find(place => place.id == site_id);
	  console.log("Retrieved place:",s);
	  return { lat: s.latitude, lng: s.longitude };
	}
	
	getEventList(): void{
	  this.eventService.myEvents().subscribe(
          data => {
            if(data){
              this.events = data.json().events;
              this.eventService.setEvents(this.events);
              this.userService.refreshToken(data.json().token);
            }
          },
          err => console.log(err)
        );
	}
	
	getSites(): void{
	  this.siteService.sites().subscribe(
        data => {
          if(data){
            this.sites = data.json().sites;
            
            //this.userService.refreshToken(data.json().token); //-->This endpoint doesn't return a token
            
          }
        },
        err => console.log(err)
      );
	}

}