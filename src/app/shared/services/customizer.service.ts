import { Injectable } from '@angular/core';
import { ConfigDB } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CustomizerService {

  constructor() {
    document.body.className = this.data.color.mix_layout;
    document.body.setAttribute('main-theme-layout', this.data.settings.layout_type);
    document.getElementsByTagName('html')[0].setAttribute('dir', this.data.settings.layout_type);
    const color = this.data.color.color;
    const layoutVersion = this.data.color.layout_version;
    if (color) {
      this.createStyle(color);
      if (layoutVersion) {
        document.body.className = layoutVersion;
      }
    }
  }

  // Configuration Layout
  public data = ConfigDB.data;

  // Create style sheet append in head
  createStyle(color) {
    const head = document.head;
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = window.location.origin + 'assets/css/' + color + '.css';
    head.appendChild(link);
  }

  deleteDriver(itemArray, id) {
    const index = itemArray.findIndex(x => x.driverId === id);
    if (index > -1) {
      itemArray.splice(index, 1);
    }
  }

  deleteWarehouse(itemArray, id) {
    const index = itemArray.findIndex(x => x.depotId === id);
    if (index > -1) {
      itemArray.splice(index, 1);
    }
  }

  deleteVehicle(itemArray, id) {
    const index = itemArray.findIndex(x => x.vehicleId === id);
    if (index > -1) {
      itemArray.splice(index, 1);
    }
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  getDriverNameFirstLetter(driverName: string) {
      return driverName.substring(0, 1).toUpperCase();
  }

  deleteOrder(itemArray, id) {
    const index = itemArray.findIndex(x => x.orderId === id);
    if (index > -1) {
      itemArray.splice(index, 1);
    }
  }

}
