import { Injectable } from '@angular/core';
import { Headers } from "@angular/http";

@Injectable()
export class AppGlobals {
  public static APIURI: string = "http://192.168.99.101:6000";
  public URIHEADERS: Headers = new Headers( { "Content-Type": "application/json", "Accept": "application/json" } )
  
  public isLoggedIn(): boolean{
    if(sessionStorage.getItem( "token" )) return true; //we need an if statement because the function returns a string
    else return false;
  }
}