import { Component } from '@angular/core';
import { SitesService } from '../../services/sites.service';
import { UserService } from '../../services/user.service';

import { OnInit } from '@angular/core';


@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.sass'],
})

export class SitesComponent implements OnInit{
  sites: any;
  eventsOf: any;
  selectedSiteId: any;

  constructor(private userService: UserService, private sitesService: SitesService)
	{
		this.sites = [
      //{image: "http://1.bp.blogspot.com/-pGhcdlb6f-4/U2b4BLo4v9I/AAAAAAAAIvo/V1bQLXkypnM/s1600/1-nuevo-edificio-facultad-enfermeria-campus-UNAL-sede-bogota.jpg", description:"12345", name:"nameaa"},
      //{image: "http://1.bp.blogspot.com/-pGhcdlb6f-4/U2b4BLo4v9I/AAAAAAAAIvo/V1bQLXkypnM/s1600/1-nuevo-edificio-facultad-enfermeria-campus-UNAL-sede-bogota.jpg", description:"12345", name:"nameaa"}
    ];

    this.eventsOf = null;
  }

  setSiteId(id){
    this.selectedSiteId = id;
  }

  ngOnInit() {
    this.sitesService.sites().subscribe(
      data => {
        if(data){
          this.sites = data.json().sites;
          this.sitesService.setSites(this.sites);
          //this.userService.refreshToken(data.json().token); //-->This endpoint doesn't return a token
        }
      },
      err => console.log(err)
    )
  }
}
