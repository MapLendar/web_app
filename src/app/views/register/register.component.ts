import { Component } from '@angular/core';
import { User } from "../../models/user.model";
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  user: User;
  password: any;
  submitted = false;
  registerForm: FormGroup;
  
  constructor( private userService: UserService, private formBuilder: FormBuilder)
	{
		this.user = new User( {} );
		this.password = {
			value: "",
			confirmation: ""
    };
    this.registerForm = this.createRegisterForm();
    
  }

  private register(): void
	{
    if( this.registerForm.invalid )
    return;

		this.submitted = true;

    this.userService.create( this.user, this.password.value, this.password.confirmation ).subscribe(
      err => console.log(err)
    );
  }
  
  private createRegisterForm(): FormGroup
	{
		return this.formBuilder.group(
			{
				first_name: ["", [Validators.required]],
				last_name: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.pattern( /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ )]],
        age: ["", [Validators.required]],        
				password: ["", [Validators.required, Validators.minLength( 8 )]],
				passwordConfirmation: ["", [Validators.required, Validators.minLength( 8 )]]
			} );
	}
}
