import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-right-info',
  templateUrl: './right-info.component.html',
  styleUrls: ['./right-info.component.scss']
})
export class RightInfoComponent implements OnInit {

  @Input()createdBy: string;
  @Input()createdOn: string;
  @Input()modifiedBy: string;
  @Input()modifiedOn: string;
  constructor() { }

  ngOnInit(): void {
  }

}
