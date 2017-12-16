import { Component, OnInit, Renderer, HostListener, AfterViewInit } from '@angular/core';
import { HomeService } from './home.service';
import { User, UserData } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  roles: any;
  citizenshipStatus: object[];
  otherCountries: object[];
  states: object[];
  empStatus: object[];
  accountTypes: object[];
  isScrollByClick: boolean;
  menuItems: HTMLCollection;
  users: User[];

  constructor(
    private homeService: HomeService,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.loadComponentData();
    this.loadUserData();
  }

  ngAfterViewInit() {
    this.menuItems = document.getElementById('nav-list').children;
    this.activeElement(this.menuItems[0]);
  }

  loadComponentData() {
    return this.homeService.getComponentData().then((response) => {
      this.roles = response.ROLES;
      this.citizenshipStatus = response.CITIZENSHIP;
      this.otherCountries = response.OTHER_COUNTRIES;
      this.states = response.STATES;
      this.empStatus = response.EMP_STATUS;
      this.accountTypes = response.ACCOUNT_TYPES;
    });
  }

  loadUserData() {
    return this.homeService.getUserData().then((data) => {
      this.users = data;
    });
  }

  goToSection(section: string, event: any) {
    document.querySelector('#' + section).scrollIntoView();
    this.activeElement(event.target.parentElement);
    this.isScrollByClick = true;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.isScrollByClick === true) {
      this.isScrollByClick = false;
      return;
    }
    const infoItems = ['section1', 'section2', 'section3', 'section4', 'section5', 'section6'];
    for (let i = 0; i < infoItems.length; i++) {
      if (document.querySelector('#' + infoItems[i]).getBoundingClientRect().top <= 0) {
        this.activeElement(this.menuItems[i]);
      }
    }
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.activeElement(this.menuItems[this.menuItems.length - 2]);
    }
  }

  activeElement(element) {
    for (let i = 0; i < this.menuItems.length; i++) {
      this.menuItems.item(i).classList.remove('active-menu');
    }
    this.renderer.setElementClass(element, 'active-menu', true);
  }

  backToTop() {
    window.scrollTo(0, 0);
    this.activeElement(this.menuItems[0]);
  }

  getUserRole(key: number): string {
    let result: string;
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].key === key) {
        result = this.roles[i].value;
      }
    }
    return result;
  }

  getUserName(userId: number): string {
    let result: string;
    const user = this.getUserByUserId(userId);
    if (user) {
      result = user.data[1].fieldValue + ' ' + user.data[0].fieldValue;
    }
    return result;
  }

  calcCompletePercent(userId: number) {
    const user = this.getUserByUserId(userId);
    if (user) {
      const totalField = user.data.length;
      // total required fields of user
      const requiredFields = this.calcTotalRequireField(user);
      const unrequiredFields = totalField - requiredFields;
      // calculate completed require fields
      let completeRequireFields = 0;
      for (let i = 0; i < user.data.length; i++) {
        if (user.data[i].required === true && user.data[i].fieldValue.length > 0) {
          completeRequireFields++;
        }
      }
      // calculate unrequired field percent in form
      const unrequiredFieldPercent = Math.floor((unrequiredFields / totalField) * 100);
      // calculate required filed complete percent in form
      const requiredFieldCompletePercent = Math.floor((completeRequireFields / totalField) * 100);
      return unrequiredFieldPercent + requiredFieldCompletePercent + '%';
    }
  }

  calcTotalRequireField(user: User): number {
    let result = 0;
    for (let i = 0; i < user.data.length; i++) {
      if (user.data[i].required === true) {
        result ++;
      }
    }
    return result;
  }

  getUserByUserId(userId: number) {
    for (let i = 0; i < this.users.length; i++) {
      if (userId === this.users[i].userId) {
        return this.users[i];
      }
    }
    return null;
  }

}
