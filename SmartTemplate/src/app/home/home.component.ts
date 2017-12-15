import { Component, OnInit, Renderer, HostListener, AfterViewInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  roles: object[];
  citizenshipStatus: object[];
  otherCountries: object[];
  states: object[];
  empStatus: object[];
  accountTypes: object[];
  isScrollByClick: boolean;
  menuItems: HTMLCollection;

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

  ngAfterViewInit() {
    this.menuItems = document.getElementById('nav-list').children;
    this.activeElement(this.menuItems[0]);
  }

  loadComponentData() {
    return this.homeService.getComponentData();
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

}
