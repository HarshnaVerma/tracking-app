
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateTaskComponent} from '../../task-management/task/create-task/create-task.component';
import {Router} from "@angular/router";

const body = document.getElementsByTagName('body')[0];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menuItems: Menu[];
  public items: Menu[];
  public openNav = false;
  // public right_sidebar = false;
  public text: string;
  public isOpenMobile = false;
  public searchResult = false;
  public searchResultEmpty = false;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService, private dialog: MatDialog,
              private router: Router) {  }

  ngOnInit() {
    this.navServices.items.subscribe(menuItems => {
      this.items = menuItems;
    });
    console.log('this.log: ' + JSON.stringify(this.items));
  }

  collapseSidebar() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  searchTerm(term: any) {
    console.log('ter,: ' + term + ' : ' + JSON.stringify(term));
    term ? this.addFix() : this.removeFix();
    if (!term) { return this.menuItems = []; }
    const items = [];
    term = term.toLowerCase();
    this.items.filter(menuItems => {
      if (menuItems.title.toLowerCase().includes(term) && menuItems.type === 'link') {
        items.push(menuItems);
      }
      if (!menuItems.children) { return false; }
      menuItems.children.filter(subItems => {
        if (subItems.title.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = menuItems.icon;
          items.push(subItems);
        }
        if (!subItems.children) { return false; }
        subItems.children.filter(suSubItems => {
          if (suSubItems.title.toLowerCase().includes(term)) {
            suSubItems.icon = menuItems.icon;
            items.push(suSubItems);
          }
        });
      });
      this.checkSearchResultEmpty(items);
      this.menuItems = items;
    });
  }

  checkSearchResultEmpty(items) {
    this.searchResultEmpty = !items.length;
  }

  addFix() {
    this.searchResult = true;
    body.classList.add('offcanvas');
  }

  removeFix() {
    this.searchResult = false;
    body.classList.remove('offcanvas');
    this.text = '';
  }


  openCreateTask() {
    this.dialog.open(CreateTaskComponent, {
      width: '800px',
      backdropClass: 'backdropBackground',
    });
  }

  logOut() {
    this.router.navigate(['/auth/login']).then();
  }
}
