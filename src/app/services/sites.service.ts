import { Injectable, Component }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppGlobals } from "../app.settings";
import { User } from "../models/user.model";

@Injectable()
export class SitesService
{
	private sitesURL: string;

	constructor( private http: Http, public app: AppGlobals )
	{
		this.sitesURL = `${AppGlobals.APIURI}/sites`;
    }
    
    public sites(): Observable<any>
	{		
		return this.http.get( `${this.sitesURL}`, { headers: this.app.URIHEADERS } )
			.map( response => response )
			.catch( this.handleError );
    }
    
    public setSites(sites: any): void
	{		
		sessionStorage.setItem( "sites", JSON.stringify( sites ) );
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
}
