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
  
  constructor(
     private eventServiceService: EventServiceService,
     private http: Http,
     private formBuilder: FormBuilder, 
     private router: Router,
  ) {
     this.event = new Event( {} );
     this.registerForm = this.createRegisterForm();
     }

  ngOnInit() {
  }

    private crear(): void
	{
    if( this.registerForm.invalid )
    return;

    this.submitted = true;
  
    console.log(this.eventServiceService.crear( this.event ).subscribe(
      
      data => {
        if(data){
          this.router.navigate(['/events']);
        } 
      },
      err => console.log(err)
    ));
  }

  
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
