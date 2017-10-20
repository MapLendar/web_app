import { Injectable, Component }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppGlobals } from "../app.settings";
import { User } from "../models/user.model";

@Injectable()
export class UserService
{
	private userSubject: Subject<User>;
	public userState: Observable<User>;
	private logInURL: string;
	private usersURL: string;
	private logOutURL: string;

	constructor( private http: Http, public app: AppGlobals )
	{
		this.userSubject = new Subject<User>();
		this.userState = this.userSubject.asObservable();
		this.logInURL = `${AppGlobals.APIURI}/sign-in`;
		this.logOutURL = `${AppGlobals.APIURI}/logout`;
		this.usersURL = `${AppGlobals.APIURI}/users`;
	}

	public getSessionStorageUser(): void
	{
		let token: string = sessionStorage.getItem( "token" );
		//let user: User;
		if( token )
		{
			//let data: any = { data: JSON.parse( userString ) };
			//data.token = data.data.token;
			//delete data.data.token;
			//user = new User( data );
			if( !this.app.URIHEADERS.has( "Authorization" ) )
				this.setToken(token.replace(/['"]+/g, ''));
		}
		//else
		//	user = new User( {} );
		//this.setUser( user );
	}
/*
	public setUser( user: User, save: boolean = false ): void
	{
		if( user.token && save )
			sessionStorage.setItem( "user", JSON.stringify( user ) );
		this.userSubject.next( <User>user );
	}
*/
	public users(): Observable<any>
	{		
		return this.http.get( `${this.usersURL}`, { headers: this.app.URIHEADERS } )
			.map( response => response )
			.catch( this.handleError );
	}

	public setUsers(users: any): void
	{		
		sessionStorage.setItem( "users", JSON.stringify( users ) );
	}


	public setToken( token: any ): void
	{
		sessionStorage.setItem( "token", JSON.stringify( token ) );
		this.app.URIHEADERS.append("Authorization", token);
		console.log("SetToken: \n", this.app.URIHEADERS);
	}
	
	public deleteToken(): void {
		sessionStorage.removeItem( "token" );
		this.app.URIHEADERS.delete("Authorization");
	}
	
	public refreshToken( token: any ): void
	{
		this.deleteToken();
		this.setToken(token);
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

	public logIn( email: any, password: any ): Observable<any>
	{
		return this.http.post( this.logInURL, {email, password}, { headers: this.app.URIHEADERS } )
			.map( response => response.json().token )
			.catch( this.handleError );
	}
	
	public logOut(): Observable<any>
	{
		let logoutHeader = JSON.parse(JSON.stringify(this.app.URIHEADERS));
		this.deleteToken();
		sessionStorage.clear();
		return this.http.get( this.logOutURL, { headers: logoutHeader } )
			.map( response => response.json() )
			.catch( this.handleError );
	}

	public create( user: User, password: string, password_confirmation: string ): Observable<any>
	{		
		return this.http.post( `${this.usersURL}`, { first_name: user.first_name, last_name: user.last_name,password, email: user.email, age: user.age, password_confirmation }, { headers: this.app.URIHEADERS } )
			.map( response => response.json().user )
			.catch( this.handleError );
	}

	public update( user: User ): Observable<any>
	{
		return this.http.put( `${this.usersURL}`, { data: user }, { headers: this.app.URIHEADERS } )
			.map( response => response.json().data )
			.catch( this.handleError );
	}
}
