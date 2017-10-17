import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppGlobals } from "../app.settings";
import { User } from "../models/user.model";
import { Event } from "../models/event.model";

@Injectable()
export class EventServiceService {

  private logInURL: string;
  private usersURL: string; 	
  private eventsURL: string; 

  constructor(private http: Http) { 
	this.logInURL = `${AppGlobals.APIURI}/sign-in`;
 	this.usersURL = `${AppGlobals.APIURI}/users`;
    this.eventsURL = `${AppGlobals.APIURI}/events`;
  }
  
  public crear( event: Event ): Observable<any>
	{		
		return this.http.post( `${this.eventsURL}`, { name: event.name, description: event.description, site_id: event.site_id, start_time: event.start_time, end_time: event.end_time }, { headers: AppGlobals.URIHEADERS } )
			.map( response => response.json().user )
			.catch( this.handleError );
	}

  createEvent( name, description, site_id, start_time, end_time, owner_id) { 
	let body = { name: name, description: description, site_id: site_id, start_time: start_time, end_time: end_time, owner_id: owner_id}
	let headers = new Headers({ 'ContentType': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.post('http://192.168.99.101:6000/events', body, options).map((response:
	Response) => {
	console.log(response.json());
	response.json();
   })
  }

	// Handle errors
	private handleError( error: Response | any )
	{
		let errMsg: string;
		if( error instanceof Response )
		{
			const body = error.json() || "";
			const err = body.error || JSON.stringify( body );
			errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
		}
		else
			errMsg = error.message ? error.message : error.toString();
		console.error( errMsg );

		return Observable.throw( errMsg );
	}
       
	public update( event: Event ): Observable<any>
	{
		return this.http.put( `${this.eventsURL}`, { data: event }, { headers: AppGlobals.URIHEADERS } )
			.map( response => response.json().data )
			.catch( this.handleError );
	}

	public events(): Observable<any>
	{		
		return this.http.get( `${this.eventsURL}`, { headers: AppGlobals.URIHEADERS } )
			.map( response => response )
			.catch( this.handleError );
    }
    
    public setEvents(events: any): void
	{		
		sessionStorage.setItem( "events", JSON.stringify( events ) );
	}

}
