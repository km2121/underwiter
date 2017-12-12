import { Component, OnInit } from '@angular/core';
import { ROLES, CITIZENSHIP, OTHER_COUNTRIES } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  roles: object[];
  citizenshipStatus: object[];
  otherCountries: object[];

  constructor() { }

  ngOnInit() {
    this.roles = ROLES;
    this.citizenshipStatus = CITIZENSHIP;
    this.otherCountries = OTHER_COUNTRIES;
  }

}
