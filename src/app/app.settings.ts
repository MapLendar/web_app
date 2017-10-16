import { Injectable } from '@angular/core';
import { Headers } from "@angular/http";

@Injectable()
export class AppGlobals {
  public static APIURI: string = "http://192.168.99.101:4000";
  public static URIHEADERS: Headers = new Headers( { "Content-Type": "application/json", "Accept": "application/json" } )
}