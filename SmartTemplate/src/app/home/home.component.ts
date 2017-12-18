import { Component, OnInit, Renderer, HostListener, AfterViewInit, AfterViewChecked } from '@angular/core';
import { HomeService } from './home.service';
import { User } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  propertiesData: any;
  properties: any;
  roles: any;
  selectedRole: any;
  citizenshipStatus: object[];
  otherCountries: object[];
  states: object[];
  empStatus: object[];
  accountTypes: object[];
  isScrollByClick: boolean;
  menuItems: HTMLCollection;
  users: User[];
  firstInit: boolean;
  selectedUser: User;

  constructor(
    private homeService: HomeService,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.firstInit = true; // flag to check first time init of component, after this, do not run the code in ngAfterViewChecked
    this.users = [];
    this.loadComponentProperties();
    this.loadComponentData();
    this.loadUserData();
  }

  ngAfterViewChecked() {
    // check element has been init or not. Because use *ngIf in html, must to check at ngAfterViewChecked
    if (document.getElementById('nav-list') && this.firstInit === true) {
      this.menuItems = document.getElementById('nav-list').children;
      this.activeElement(this.menuItems[0]);
      this.firstInit = false;
    }
  }

  /**
   * This function load component data such as dropdown, group radion button
   */
  loadComponentData() {
    return this.homeService.getComponentData().then((response) => {
      this.roles = response.ROLES;
      this.selectedRole = this.roles[0];
      this.citizenshipStatus = response.CITIZENSHIP;
      this.otherCountries = response.OTHER_COUNTRIES;
      this.states = response.STATES;
      this.empStatus = response.EMP_STATUS;
      this.accountTypes = response.ACCOUNT_TYPES;
    });
  }

  /**
   * This function load component properties for each component in view
   */
  loadComponentProperties() {
    return this.homeService.getComponentProperties().then((response) => {
      this.propertiesData = response;
      this.properties = this.propertiesData[0];
    });
  }

  /**
   * This function load user data for list user in the right
   * Set selected user is fist user in list
   */
  loadUserData() {
    return this.homeService.getUserData().then((data) => {
      if (data && data.length > 0) {
        this.users = data;
        this.changeUser(this.users[0].userId);
      }
    });
  }

  /**
   * This function change old selected user to new selected user
   */
  changeUser(userId: number) {
    this.selectedUser = this.getUserByUserId(userId);
    this.mapperDataToView(this.selectedUser);
  }

  /**
   * This function handle event click to menu if the left
   * @param section id of section want to go to
   * @param event target event (click)
   */
  goToSection(section: string, event: any) {
    document.querySelector('#' + section).scrollIntoView();
    this.activeElement(event.target.parentElement);
    this.isScrollByClick = true;
  }

  /**
   *  This function handle scroll to setion will highlight menu in the left
   */
  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.isScrollByClick === true) {
      this.isScrollByClick = false;
      return;
    }
    const infoItems = ['section1', 'section2', 'section3', 'section4', 'section5', 'section6'];
    for (let i = 0; i < infoItems.length; i++) {
      if (document.querySelector('#' + infoItems[i]) && document.querySelector('#' + infoItems[i]).getBoundingClientRect().top <= 0) {
        this.activeElement(this.menuItems[i]);
      }
    }
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.activeElement(this.menuItems[this.menuItems.length - 2]);
    }
  }

  /**
   * This function unactive actived menu and active selected menu in the left
   * @param element element need to active
   */
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

  /**
   * This function return user role string
   * @param key key of role (1: Borrower, 2: CoBorrower, 3: Trustee, 4: Pledger)
   */
  getUserRole(key: number): string {
    let result: string;
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].key === key) {
        result = this.roles[i].value;
      }
    }
    return result;
  }

  /**
   * This function return user name = first name + last name
   * @param userId
   */
  getUserName(userId: number): string {
    let result: string;
    const user = this.getUserByUserId(userId);
    if (user) {
      result = user.data[1].fieldValue + ' ' + user.data[0].fieldValue;
    }
    return result;
  }

  /**
   * This function return the percent complete the form base on required field has been enter information
   * @param userId
   */
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

  /**
   * This function calculate complete percent of required fields
   * @param user user want to calculate complete percent
   */
  calcTotalRequireField(user: User): number {
    let result = 0;
    for (let i = 0; i < user.data.length; i++) {
      if (user.data[i].required === true) {
        result++;
      }
    }
    return result;
  }

  /**
   * This function return an User has userId in param in this.users
   * @param userId userId of User want to get
   */
  getUserByUserId(userId: number) {
    for (let i = 0; i < this.users.length; i++) {
      if (userId === this.users[i].userId) {
        return this.users[i];
      }
    }
    return null;
  }

  /**
   * This function convert date string to date oject
   * @param date string want convert to date object
   */
  stringToDate(date: string): Date {
    if (new Date(date).getTime()) {
      return new Date(date);
    }
    return null;
  }

  /**
   * This function convert date object to date string
   * @param date date object want to convert to string
   */
  dateToString(date: Date): string {
    if (new Date(date).getTime()) {
      return new Date(date).toLocaleDateString();
    }
    return null;
  }

  /**
   * This function map data of selected user to view data
   */
  mapperDataToView(user: User) {
    user.data[3].fieldValue = this.stringToDate(user.data[3].fieldValue);
  }

  /**
   * This function map data of selected user to save data
   */
  mapperDataToSave(user: User) {
    user.data[3].fieldValue = this.dateToString(user.data[3].fieldValue);
  }

  saveData() {
    this.users.forEach((user: User) => {
      this.mapperDataToSave(user);
    });
    return this.homeService.saveUserData(this.users);
  }

}
