import { Component, OnInit, Renderer } from '@angular/core';
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
    private homeService: HomeService,
    private renderer: Renderer
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

  goToSection(section: string, event: any) {
    document.querySelector('#' + section).scrollIntoView();
    const menuItems = document.getElementById('nav-list').children;
    for (let i = 0; i < menuItems.length; i++) {
      menuItems.item(i).classList.remove('active-menu');
    }
    this.renderer.setElementClass(event.target.parentElement, 'active-menu', true);
  }

}
