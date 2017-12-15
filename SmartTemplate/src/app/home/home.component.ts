import { Component, OnInit, Renderer, HostListener, ElementRef } from '@angular/core';
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
    this.activeElement(event.target.parentElement);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const menuItems = document.getElementById('nav-list').children;
    const infoItems = ['section1', 'section2', 'section3', 'section4', 'section5', 'section6'];
    for (let i = 0; i < infoItems.length; i++) {
      if (document.querySelector('#' + infoItems[i]).getBoundingClientRect().top <= 0) {
        this.activeElement(menuItems[i]);
      }
    }
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.activeElement(menuItems[menuItems.length - 2]);
    }
  }

  activeElement(element) {
    const menuItems = document.getElementById('nav-list').children;
    for (let i = 0; i < menuItems.length; i++) {
      menuItems.item(i).classList.remove('active-menu');
    }
    this.renderer.setElementClass(element, 'active-menu', true);
  }

}
