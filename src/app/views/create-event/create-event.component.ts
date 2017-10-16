import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../../services/event-service.service'; 
import { Http, Request, RequestMethod, RequestOptions, Headers } from '@angular/http';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass']
})
export class CreateEventComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
     private eventServiceService: EventServiceService,
     private http: Http,
     private formBuilder: FormBuilder	
  ) {
     this.registerForm = this.createRegisterForm();
     }

  ngOnInit() {
  }
  
  createEvent(event_id, name, description, site_id, start_time, end_time, owner_id) {
      this.eventServiceService.createEvent(event_id, name, description, site_id, start_time, end_time, owner_id	).subscribe(res => {
      console.log(res)
   })
  }
  
  private createRegisterForm(): FormGroup
	{
		return this.formBuilder.group(
			{
				name: ["", [Validators.required]],
				description: ["", [Validators.required]],
        site_id: ["", [Validators.required]],
        start_time: ["", [Validators.required]],        
				end_time: ["", [Validators.required]],
				owner_id: ["", [Validators.required]]
			} );
	}
  
  	
}
