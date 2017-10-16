import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  email: any;
  password: any;
  submitted = false;
  loginForm: FormGroup;
  
  constructor (private userService: UserService, private formBuilder: FormBuilder, private router: Router){
    this.email = "";
    this.password = "";

    this.loginForm = this.createLoginForm();
    
  }

  private logIn(): void
	{
    if( this.loginForm.invalid )
    return;

		this.submitted = true;

    console.log(this.userService.logIn( this.email, this.password ).subscribe(
      data => {
        if(data){
          this.userService.setToken(data);
          this.router.navigate(['/']);
        }
      },
      err => console.log(err)
    ));
  }

  private createLoginForm(): FormGroup
	{
		return this.formBuilder.group(
			{
        email: ["", [Validators.required, Validators.pattern( /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ )]],
				password: ["", [Validators.required, Validators.minLength( 8 )]]
			} );
	}
}
