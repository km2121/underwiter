import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  roles: object[];
  citizenshipStatus: object[];
  otherCountries: object[];
  states: object[];
  empStatus: object[];
  accountTypes: object[];

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.loadComponentData().then((response) => {
      this.roles = response.ROLES;
      this.citizenshipStatus = response.CITIZENSHIP;
      this.otherCountries = response.OTHER_COUNTRIES;
      this.states = response.STATES;
      this.empStatus = response.EMP_STATUS;
      this.accountTypes = response.ACCOUNT_TYPES;
    });
  }

  loadComponentData() {
    return this.homeService.getComponentData();
  }

}
