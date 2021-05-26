import {Component, OnInit} from '@angular/core';
import {DriverRegistrationComponent} from '../driver-registration/driver-registration.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-drivers-info',
  templateUrl: './drivers-info.component.html',
  styleUrls: ['./drivers-info.component.scss']
})
export class DriversInfoComponent implements OnInit {



  constructor(private dialog: MatDialog) {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

  }

  ngOnInit() {
    console.log('6767');
  }


  addDriver() {
    const dialogRef = this.dialog.open(DriverRegistrationComponent, {
      width: '1100px',
     // height: '600px',
  //    panelClass: 'custom-modalbox',
      backdropClass: 'backdropBackground',
      //  disableClose: true
    });
  }
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
//
//   return {
//     id: id.toString(),
//     name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
//
// }
