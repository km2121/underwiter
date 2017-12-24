import { Component, OnInit, Renderer, HostListener, AfterViewChecked } from '@angular/core';
import { HomeService } from './home.service';
import { User, Menu, FieldMetadata } from '../shared';

const DATEPICKER = 'datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  roles: any;
  selectedRole: any;
  citizenshipStatus: object[];
  fieldMetadata: FieldMetadata[];
  empStatus: object[];
  accountTypes: object[];
  isScrollByClick: boolean;
  menuItems: HTMLCollection;
  firstInit: boolean;
  users: User[];
  selectedUser: User;
  usersMenuData: Menu[];
  selectedUserMenu: Menu;

  constructor(
    private homeService: HomeService,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.usersMenuData = [];
    this.users = [];
    this.loadData();
  }

  ngAfterViewChecked() {
    // check element has been init or not. Because use *ngIf in html, must to check at ngAfterViewChecked
    if (document.getElementById('nav-list') && this.firstInit === true) {
      this.menuItems = document.getElementById('nav-list').children;
      this.activeElement(this.menuItems[0].children[0]);
      this.firstInit = false;
    }
  }

  /**
   * Initialize data
   */
  loadData() {
    this.loadComponentMetadata();
    this.loadParticipantType();
    this.loadUserData();
    this.initMenu();
  }

  /**
   * This function load component data such as dropdown, group radion button
   */
  loadParticipantType() {
    return this.homeService.getParticipantTypeData().subscribe((data) => {
      this.roles = data;
    });
  }

  /**
   * This function load component properties for each component in view
   */
  loadComponentMetadata() {
    return this.homeService.getMetadata().subscribe((data) => {
      this.fieldMetadata = data;
      this.firstInit = true; // flag to check first time init of component, after this, do not run the code in ngAfterViewChecked
    }, (error) => {
      return error;
    });
  }

  /**
   * This function load user data for list user in the right
   * Set selected user is fist user in list
   */
  loadUserData() {
    return this.homeService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.selectedUser = data[0];
      this.mapDataToView(this.selectedUser);
    }, (error) => {
      // handle error
    });
  }

  /**
   * Initialize left menu
   */
  initMenu() {
    return this.homeService.getMenus().subscribe((data) => {
      this.usersMenuData = data;
      this.selectedUserMenu = this.getMenuByUser(this.selectedUser);
    }, (error) => {
      return error;
    });
  }

  /**
   * Get Menu from User
   * @param user User
   */
  getMenuByUser(user: User) {
    for (let i = 0; i < this.usersMenuData.length; i++) {
      if (user.loanParticpantId === this.usersMenuData[i].loanParticpantId) {
        return this.usersMenuData[i];
      }
    }
    return null;
  }

  /**
   * Return menu name
   * @param menuId id of menu
   */
  getMenuNameById(menuId: string) {
    for (let i = 0; i < this.selectedUserMenu.data.length; i++) {
      if (menuId === this.selectedUserMenu.data[i].menuId) {
        return this.selectedUserMenu.data[i].menuName;
      }
    }
  }

  /**
   * Return metadata for field such as dropdown, radio group
   * @param fieldId id of field
   */
  getMetadataForField(fieldId: number) {
    for (let i = 0; i < this.fieldMetadata.length; i++) {
      if (fieldId === this.fieldMetadata[i].fieldId) {
        return this.fieldMetadata[i].metadata;
      }
    }
    return null;
  }

  /**
   * This function save data of old user and change old selected user to new selected user
   */
  changeUser(userId: number) {
    this.saveData();
    this.selectedUser = this.getUserByUserId(userId);
    this.mapDataToView(this.selectedUser);
    this.selectedUserMenu = this.getMenuByUser(this.selectedUser);
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
    for (let i = 0; i < this.selectedUserMenu.data.length; i++) {
      if (document.querySelector('#' + this.selectedUserMenu.data[i].menuId) &&
        document.querySelector('#' + this.selectedUserMenu.data[i].menuId).getBoundingClientRect().top <= 0) {
        this.activeElement(this.menuItems[i].children[0]);
      }
    }
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.activeElement(this.menuItems[this.menuItems.length - 2].children[0]);
    }
  }

  /**
   * This function unactive actived menu and active selected menu in the left
   * @param element element need to active
   */
  activeElement(element) {
    for (let i = 0; i < this.menuItems.length; i++) {
      this.menuItems.item(i).children[0].classList.remove('active-menu');
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
      if (this.roles[i].participantTypeId === key) {
        result = this.roles[i].participantTypeName;
      }
    }
    return result;
  }

  /**
   * This function return user name = first name + last name
   * @param userId
   */
  getUserName(user: User) {
    const lastNameField = 'Last name';
    const firstNameField = 'First name';
    let lastName;
    let firstName;
    for (let i = 0; i < user.data.length; i++) {
      for (let j = 0; j < user.data[i].fields.length; j++) {
        if (user.data[i].fields[j].fieldName === lastNameField) {
          lastName = user.data[i].fields[j].fieldValue;
        }
        if (user.data[i].fields[j].fieldName === firstNameField) {
          firstName = user.data[i].fields[j].fieldValue;
        }
      }
    }
    return firstName + ' ' + lastName;
  }

  /**
   * This function return the percent complete the form base on required field has been enter information
   * @param user
   */
  calcCompletePercent(user: User) {
    let totalFields = 0;
    let completedFields = 0;
    for (let i = 0; i < user.data.length; i++) {
      for (let j = 0; j < user.data[i].fields.length; j++) {
        if (user.data[i].fields[j].fieldValue !== null && user.data[i].fields[j].fieldValue.length > 0) {
          completedFields++;
        }
        totalFields++;
      }
    }
    return Math.floor(completedFields / totalFields * 100) + '%';
  }

  /**
   * This function calculate completed percent of required field
   * @param user user want to calculate complete percent
   */
  calcCompletedRequiredPercent(user: User) {
    let requiredFields = 0;
    let completedRequiredFields = 0;
    for (let i = 0; i < user.data.length; i++) {
      for (let j = 0; j < user.data[i].fields.length; j++) {
        if (user.data[i].fields[j].required === true) {
          requiredFields++;
          if (user.data[i].fields[j].fieldValue !== null && user.data[i].fields[j].fieldValue.length > 0) {
            completedRequiredFields++;
          }
        }
      }
    }
    return Math.floor(completedRequiredFields / requiredFields * 100) + '%';
  }

  /**
   * This function return an User has userId in param in this.users
   * @param userId userId of User want to get
   */
  getUserByUserId(userId: number) {
    for (let i = 0; i < this.users.length; i++) {
      if (userId === this.users[i].loanParticpantId) {
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

  mapDataToView(user: User) {
    for (let i = 0; i < user.data.length; i++) {
      for (let j = 0; j < user.data[i].fields.length; j++) {
        if (user.data[i].fields[j].controlType === DATEPICKER) {
          user.data[i].fields[j].fieldValue = new Date(user.data[i].fields[j].fieldValue);
        }
      }
    }
  }

  mapDataToSave(user: User) {
    for (let i = 0; i < user.data.length; i++) {
      for (let j = 0; j < user.data[i].fields.length; j++) {
        if (user.data[i].fields[j].controlType === DATEPICKER) {
          user.data[i].fields[j].fieldValue = new Date(user.data[i].fields[j].fieldValue).toLocaleDateString();
        }
      }
    }
  }

  saveData() {
    // this.mapDataToSave(this.selectedUser);
    return this.homeService.saveUserData(this.selectedUser);
  }

}
