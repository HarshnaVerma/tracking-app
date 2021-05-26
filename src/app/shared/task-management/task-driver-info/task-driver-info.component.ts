import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-task-driver-info',
  templateUrl: './task-driver-info.component.html',
  styleUrls: ['./task-driver-info.component.scss']
})
export class TaskDriverInfoComponent implements OnInit {

  public infoArea: any = '';
  public data: any;
  title = 'Task';
  showSearch: boolean;
  searchText: string;
  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

  constructor() {
  }

  // Open Info
  openInfo(val) {
    this.infoArea = val;
    if (val === 'task') {
      this.title = 'Task';
      this.showSearch = false;
      this.searchText = '';
    } else {
      this.title = 'Driver';
      this.showSearch = false;
      this.searchText = '';
    }
  }

  ngOnInit() { }

  showSearchBox() {
    this.showSearch = true;
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 10);
  }

  clearValues() {
      this.showSearch = false;
      this.searchText = '';
  }

  searchTerm(searchText: string) {
    // console.log('123' + searchText);
    // setTimeout(() => {
    //   this.searchInput.nativeElement.focus();
    // }, 10);
  }

}
