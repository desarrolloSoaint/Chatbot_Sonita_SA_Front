import { Component, OnInit } from '@angular/core';
import { ContactService } from 'app/services/contact.service';
import { Country } from 'app/models/country';
import { Currency } from 'app/models/currency';
import { Gender } from 'app/models/gender';
import { Profession } from 'app/models/profession';
import { StateCivil } from 'app/models/state-civil';
import { State } from 'app/models/state';
import { Rol } from 'app/models/rol';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  country:Country [] = [];
  currency:Currency [] = [];
  gender:Gender [] = [];
  profession:Profession [] = [];
  stateCivil:StateCivil [] = [];
  state:State [] = [];
  roles: any;

  constructor(private contactService: ContactService,) { }

  ngOnInit() {
    
    this.contactService.countRol().subscribe(
      data => {
        this.roles = data;
      },
      err => {
        console.log(err);
      }
    );
  
    this.contactService.countPais().subscribe(
      data => {
        this.country = data;
      },
      err => {
        console.log(err);
      }
    );

    this.contactService.countMoneda().subscribe(
      data => {
        this.currency = data;
      },
      err => {
        console.log(err);
      }
    );
    this.contactService.countGenero().subscribe(
      data => {
        this.gender = data;
      },
      err => {
        console.log(err);
      }
    );
    this.contactService.countProfesion().subscribe(
      data => {
        this.profession = data;
      },
      err => {
        console.log(err);
      }
    );
    this.contactService.countStateCivil().subscribe(
      data => {
        this.stateCivil = data;
      },
      err => {
        console.log(err);
      }
    );
    this.contactService.countState().subscribe(
      data => {
        this.state = data;
      },
      err => {
        console.log(err);
      }
    );

  }
  }

   

