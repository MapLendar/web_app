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

  constructor(	private http: Http, public app: AppGlobals ) { 
	this.logInURL = `${AppGlobals.APIURI}/sign-in`;
 	this.usersURL = `${AppGlobals.APIURI}/users`;
    this.eventsURL = `${AppGlobals.APIURI}/events`;
  }
  


  public create( event: Event ): Observable<any>
	{
		console.log(this.app.URIHEADERS);
		return this.http.post( `${this.eventsURL}`,  {name: event.name, description: event.description, site_id: event.site_id, start_time: event.start_time, end_time: event.end_time }, { headers: this.app.URIHEADERS } )
			.map( response => response.json().data )
			.catch( this.handleError );
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

	public setToken( token: any ): void
	{
		sessionStorage.setItem( "token", JSON.stringify( token ) );
		this.app.URIHEADERS.set( "Authorization", token );
	}
	   
	
	public update( event: Event ): Observable<any>
	{
		return this.http.put( `${this.eventsURL}`, { data: event }, { headers: this.app.URIHEADERS } )
			.map( response => response.json().data )
			.catch( this.handleError );
	}
	
	public setEvents(events: any): void
	{		
		sessionStorage.setItem( "events", JSON.stringify( events ) );
	}

	public events(): Observable<any>
	{		
		return this.http.get( `${this.eventsURL}/`, { headers: this.app.URIHEADERS } )
			.map( response => response )
			.catch( this.handleError );
	}

	public eventsBySite(siteId: any): Observable<any>
	{		
		return this.http.get( `${this.eventsURL}/site/${siteId}`, { headers: this.app.URIHEADERS } )
			.map( response => response )
			.catch( this.handleError );
	}

	public myEvents(): Observable<any>
	{		
		return this.http.get( `${this.eventsURL}/myEvents`, { headers: this.app.URIHEADERS } )
			.map( response => response )
			.catch( this.handleError );
	}
}
