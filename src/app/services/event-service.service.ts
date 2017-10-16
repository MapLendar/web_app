import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class EventServiceService {

  constructor(private http: Http) { }
  createEvent(owner_id, site_id) {
	let body = { owner_id: owner_id, site_id: site_id }
	let headers = new Headers({ 'ContentType': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.post('http://192.168.99.101:4000/buy', body, options).map((response:
	Response) => {
	console.log(response.json());
	response.json();
   })
  }
}
