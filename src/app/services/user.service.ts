import { Injectable, Component }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppGlobals } from "../app.settings";
import { User } from "../models/user.model";

@Component({
  providers: [AppGlobals]
})

@Injectable()
export class UserService
{
	private userSubject: Subject<User>;
	public userState: Observable<User>;
	private logInURL: string;
	private usersURL: string;

	constructor( private http: Http )
	{
		this.userSubject = new Subject<User>();
		this.userState = this.userSubject.asObservable();
		this.logInURL = `${AppGlobals.APIURI}/sign-in`;
		this.usersURL = `${AppGlobals.APIURI}/users`;
	}

	public getSessionStorageUser(): void
	{
		let userString: string = sessionStorage.getItem( "user" );
		let user: User;
		if( userString )
		{
			let data: any = { data: JSON.parse( userString ) };
			data.token = data.data.token;
			delete data.data.token;
			user = new User( data );
			if( !AppGlobals.URIHEADERS.has( "Authorization" ) )
				AppGlobals.URIHEADERS.set( "Authorization", user.token );
		}
		else
			user = new User( {} );
		this.setUser( user );
	}

	public setUser( user: User, save: boolean = false ): void
	{
		if( user.token && save )
			sessionStorage.setItem( "user", JSON.stringify( user ) );
		this.userSubject.next( <User>user );
	}

	public logOut(): void
	{
		sessionStorage.removeItem( "user" );
		this.setUser( new User( {} ) );
		AppGlobals.URIHEADERS = new Headers( { "Content-Type": "application/json", "Accept": "application/json" } );
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
	}

	public logIn( email: any, password: any ): Observable<any>
	{
		return this.http.post( this.logInURL, {email, password}, { headers: AppGlobals.URIHEADERS } )
			.map( response => response.json().token )
			.catch( this.handleError );
	}

	public create( user: User, password: string, password_confirmation: string ): Observable<any>
	{		
		return this.http.post( `${this.usersURL}`, { first_name: user.first_name, last_name: user.last_name,password, email: user.email, age: user.age, password_confirmation }, { headers: AppGlobals.URIHEADERS } )
			.map( response => response.json().user )
			.catch( this.handleError );
	}

	public update( user: User ): Observable<any>
	{
		return this.http.put( `${this.usersURL}`, { data: user }, { headers: AppGlobals.URIHEADERS } )
			.map( response => response.json().data )
			.catch( this.handleError );
	}
}
