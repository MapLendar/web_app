import { Component } from '@angular/core';
import { SitesService } from '../../services/sites.service';
import { UserService } from '../../services/user.service';

import { OnInit } from '@angular/core';


@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.sass']
})
export class SitesComponent implements OnInit{
  sites: any;

  constructor(private userService: UserService, private sitesService: SitesService)
	{
		this.sites = [
      // {image: "asdas", description:"12345", name:"nameaa"},
      // {image: "asdas", description:"12345", name:"nameaa"}
    ];
  }

  ngOnInit() {
    this.sitesService.sites().subscribe(
      data => {
        if(data){
          this.sites = data.json().sites;
          this.sitesService.setSites(this.sites);
          this.userService.refreshToken(data.json().token);
        }
      },
      err => console.log(err)
    )
  }
}
