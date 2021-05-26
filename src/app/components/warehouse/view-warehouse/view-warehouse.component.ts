import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WarehouseInfo} from '../../../shared/models/warehouse/warehouse-info';
import {MapService} from '../../../shared/services/map.service';

@Component({
  selector: 'app-view-warehouse',
  templateUrl: './view-warehouse.component.html',
  styleUrls: ['./view-warehouse.component.scss']
})
export class ViewWarehouseComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ViewWarehouseComponent>,
              private mapService: MapService) {
  }

  warehouseInfo: WarehouseInfo = this.data.rowData;
  warehouseAddress: string;
  address: string;

  ngOnInit(): void {
    this.getCurrentAddress().then();
  }

  async getCurrentAddress() {
    // console.log(this.warehouseInfo.depotLatitude + ' : ' + this.warehouseInfo.depotLongitude);
    const googleMapReturnCurrentAddress = await this.mapService.getAddress(Number(this.warehouseInfo.depotLatitude), Number(this.warehouseInfo.depotLongitude));
    // @ts-ignore
    this.address = googleMapReturnCurrentAddress.address;
    if (this.address !== undefined || this.address !== '') {
      this.warehouseAddress = this.address;
    } else {
      this.warehouseAddress = this.warehouseInfo.depotAddress;
    }
  }

}
