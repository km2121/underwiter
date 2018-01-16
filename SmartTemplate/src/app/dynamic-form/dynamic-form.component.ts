import { Component, OnInit, Renderer, HostListener, AfterViewChecked } from '@angular/core';
import { DynamicFormService } from '../service/dynamic-form.service';
import { User, Menu, FieldMetadata } from '../model';
import { MatDialog } from '@angular/material';
import { ChangeRoleDialog } from './change-role.dialog';
import { SaveConfirmDialog } from './save-confirm.dialog';

const DATEPICKER = 'datepicker';
const ELE_CLASS_NAME = 'info-content';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, AfterViewChecked {
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
    private dynamicFormService: DynamicFormService,
    private renderer: Renderer,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // init data
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
    return this.dynamicFormService.getParticipantTypeData().subscribe((data) => {
      this.roles = data;
    }, (error) => {
      this.handleError(error);
    });
  }

  /**
   * This function load component properties for each component in view
   */
  loadComponentMetadata() {
    return this.dynamicFormService.getMetadata().subscribe((data) => {
      this.fieldMetadata = data;
      this.firstInit = true; // flag to check first time init of component, after this, do not run the code in ngAfterViewChecked
    }, (error) => {
      this.handleError(error);
    });
  }

  /**
   * This function load user data for list user in the right
   * Set selected user is fist user in list
   */
  loadUserData() {
    return this.dynamicFormService.getUsers().subscribe((data: User[]) => {
      this.users = data.slice();
      this.selectedUser = <User>JSON.parse(JSON.stringify(data[0]));
      this.mapDataToView(this.selectedUser);
    }, (error) => {
      this.handleError(error);
    });
  }

  /**
   * Initialize left menu
   */
  initMenu() {
    return this.dynamicFormService.getMenus().subscribe((data) => {
      this.usersMenuData = data;
      this.selectedUserMenu = this.getMenuByUser(this.selectedUser);
    }, (error) => {
      this.handleError(error);
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
      if (this.selectedUser.loanParticpantId === this.fieldMetadata[i].loanParticpantId && fieldId === this.fieldMetadata[i].fieldId) {
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
    this.selectedUser = <User>JSON.parse(JSON.stringify(this.getUserByUserId(userId)));
    this.mapDataToView(this.selectedUser);
    this.selectedUserMenu = <Menu>JSON.parse(JSON.stringify(this.getMenuByUser(this.selectedUser)));
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

  /**
   * Scroll page to top
   */
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
    let lastName: string;
    let firstName: string;
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
    if (user.loanParticpantId === this.selectedUser.loanParticpantId) {
      user = this.selectedUser;
    }
    let requiredFields = 0;
    let completedRequiredFields = 0;
    for (let i = 0; i < user.data.length; i++) {
      for (let j = 0; j < user.data[i].fields.length; j++) {
        if (user.data[i].fields[j].required === true) {
          requiredFields++;
          if (user.data[i].fields[j].fieldValue !== null) {
            if (user.data[i].fields[j].controlType !== DATEPICKER && user.data[i].fields[j].fieldValue.length > 0) {
              completedRequiredFields++;
            } else if (user.data[i].fields[j].controlType === DATEPICKER && new Date(user.data[i].fields[j].fieldValue).getTime()) {
              completedRequiredFields++;
            }
          }
        }
      }
    }
    if (requiredFields === 0) {
      return '0%';
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

  /**
   * The datepicker field [(ngModel)] must be a Date object. This function change type of fieldValue of datepicker from string to Date
   * @param user user want to map data
   */
  mapDataToView(user: User) {
    for (let i = 0; i < user.data.length; i++) {
      for (let j = 0; j < user.data[i].fields.length; j++) {
        if (user.data[i].fields[j].controlType === DATEPICKER) {
          user.data[i].fields[j].fieldValue = new Date(user.data[i].fields[j].fieldValue);
        }
      }
    }
  }

  /**
   * When save data to db. Must to change type of fieldValue to string
   * @param user user want to map data
   */
  mapDataToSave(user: User) {
    for (let i = 0; i < user.data.length; i++) {
      for (let j = 0; j < user.data[i].fields.length; j++) {
        if (user.data[i].fields[j].controlType === DATEPICKER) {
          user.data[i].fields[j].fieldValue = new Date(user.data[i].fields[j].fieldValue).toLocaleDateString();
        }
      }
    }
  }

  /**
   * Save user when select another user or click Save button
   */
  saveData() {
    if (this.calcCompletedRequiredPercent(this.selectedUser) !== '100%') {
      const dialogRef = this.dialog.open(SaveConfirmDialog, {
        width: '400px',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          this.focusFirstElementUncompleted();
        }
      });
    } else {
      this.mapDataToSave(this.selectedUser);
      return this.dynamicFormService.saveUserData(this.selectedUser);
    }
  }

  focusFirstElementUncompleted() {
    // let
    let index = -1;
    for (let i = 0; i < this.selectedUser.data.length; i++) {
      for (let j = 0; j < this.selectedUser.data[i].fields.length; j++) {
        index++;
        if ((this.selectedUser.data[i].fields[j].controlType !== DATEPICKER) && (this.selectedUser.data[i].fields[j].fieldValue.length === 0)) {
          break;
        } else if ((this.selectedUser.data[i].fields[j].controlType === DATEPICKER) &&
            !(new Date(this.selectedUser.data[i].fields[j].fieldValue).getTime())) {
              break;
        }
      }
      break;
    }
    const eleList = document.getElementsByClassName(ELE_CLASS_NAME);
    eleList[index].children[0][0].focus();
  }

  /**
   * This function control show/hide button scroll top in the bottom-right page
   */
  showScrolTop() {
    return window.scrollY > 60;
  }

  getRoleNameById(participantTypeId: number): string {
    for (let i = 0; i < this.roles.length; i++) {
      if (participantTypeId === this.roles[i].participantTypeId) {
        return this.roles[i].participantTypeName;
      }
    }
    return null;
  }

  /**
   * This function open dialog and handle data after dialog close
   */
  openDialogChangeRole() {
    const dialogRef = this.dialog.open(ChangeRoleDialog, {
      width: '500px',
      data: this.roles
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.length > 0) {
        this.roles = data;
        for (let i = 0; i < this.users.length; i++) {
          this.users[i].participantTypeId = this.roles[i].participantTypeId;
        }
      }
    });
  }

  handleError(error) {
    console.log(error);
  }

}
