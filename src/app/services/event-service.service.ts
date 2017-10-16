import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class EventServiceService {

  constructor(private http: Http) { }
  createEvent( event_id, name, description, site_id, start_time, end_time, owner_id) { 
	let body = { event_id: event_id, name: name, description: description, site_id: site_id, start_time: start_time, end_time: end_time, owner_id: owner_id}
	let headers = new Headers({ 'ContentType': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.post('http://192.168.99.101:6000/events', body, options).map((response:
	Response) => {
	console.log(response.json());
	response.json();
   })
  }
}
