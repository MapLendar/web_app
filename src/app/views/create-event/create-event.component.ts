import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms"; 	
import { Http, Request, RequestMethod, RequestOptions, Headers } from '@angular/http';

import { EventServiceService } from '../../services/event-service.service'; 
import { Event } from "../../models/event.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass']
})
export class CreateEventComponent implements OnInit {
  event: Event; 
  registerForm: FormGroup;
  submitted = false;
  postData:string;

  constructor(
     private eventServiceService: EventServiceService,
     private http: Http,
     private formBuilder: FormBuilder, 
     private router: Router,
//     private _httpService:EventServiceService	
  ) {
     this.event = new Event( {} );
     this.registerForm = this.createRegisterForm();
     }

  ngOnInit() {
  }

  onPost(){
	//this._httpService.postJSON().subscribe(
	//		data => this.postData = JSON.stringify(data),
	//		error => alert(error),
	//		() => console.log("Finished")	
	//	);
	}  
	
  private crear(): void
	{
    if( this.registerForm.invalid )
    return;

    this.submitted = true;
    //this.event.name = this.registerForm.get.name; 
  //  console.log(event)	
   // this.event.name = this.registerForm.value.name; 
    //this.event.description = this.registerForm.value.description;
    //this.event.site_id = this.registerForm.value.site_id;
    //this.event.start_time = this.registerForm.value.start_time;
    //this.event.end_time = this.registerForm.value.end_time;
    


    console.log(this.eventServiceService.crear( this.event ).subscribe(
      
      data => {
        if(data){
          this.router.navigate(['/events']);
        } 
      },
      err => console.log(err)
    ));
  }

  //createEvent(name, description, site_id, start_time, end_time) {
    //  this.eventServiceService.createEvent(name, description, site_id, start_time, end_time).subscribe(res => {
      //console.log(res)
   //})
 // }
  
  private createRegisterForm(): FormGroup
	{
		return this.formBuilder.group(
			{
				name: ["", [Validators.required]],
				description: ["", [Validators.required]],
        site_id: ["", [Validators.required]],
        start_time: ["", [Validators.required]],        
				end_time: ["", [Validators.required]]
				
			} );
	}
  
  	
}
