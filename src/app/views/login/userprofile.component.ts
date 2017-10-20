import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.sass']
})
export class UserProfileComponent {
  users: any;
  
  constructor (private userService: UserService, private formBuilder: FormBuilder, private router: Router){
  	 this.users = [
      ];
    
  }

   ngOnInit() {
      this.userService.users().subscribe(
        data => {
          if(data){
            this.users = data.json().users;
            this.userService.setUsers(this.users);
            this.userService.refreshToken(data.json().token);
          }
        },
        err => console.log(err)
      )
    }

   

	

}

