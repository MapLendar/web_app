import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms"; 	
import { Http, Request, RequestMethod, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { EventServiceService } from '../../services/event-service.service'; 
import { UserService } from '../../services/user.service';
import { Event } from "../../models/event.model";
import { Site } from "../../models/site.model";
import { SitesService } from '../../services/sites.service';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass']
})
export class CreateEventComponent implements OnInit {
  event: Event; 
  sites: Array<Site>;
  registerForm: FormGroup;
  submitted = false;
  constructor(
     private eventServiceService: EventServiceService,
     private userService: UserService,
     private sitesService: SitesService,
     private http: Http,
     private formBuilder: FormBuilder, 
     private router: Router,
  ) {
     this.event = new Event( {} );
     this.sites = new Array<Site>();
     this.registerForm = this.createRegisterForm();
     }

     ngOnInit() {
      this.sitesService.sites().subscribe(
        data => {
          if(data){
            this.sites = data.json().sites;
            
            //this.userService.refreshToken(data.json().token); //-->This endpoint doesn't return a token
            
          }
        },
        err => console.log(err)
      );
    
    }

    private crear(): void
	{
    if( this.registerForm.invalid )
    return;

    this.submitted = true;
  
    console.log(this.eventServiceService.create( this.event ).subscribe(
      
      data => {
        if(data){
          console.log("New Token: ", data.json().token)
          console.log("NEW EVENT::MESSAGE: ", data.json().message)
          this.userService.refreshToken(data.json().token);
          this.router.navigate(['/myEvents']);
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
