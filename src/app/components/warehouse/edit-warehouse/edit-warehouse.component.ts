import {Component, ElementRef, Inject, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from '../../../shared/services/config.service';
import {BackendApiService} from '../../../shared/services/backendapi.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MapService} from '../../../shared/services/map.service';
import {MapsAPILoader} from '@agm/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WarehouseInfo} from '../../../shared/models/warehouse/warehouse-info';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import {DialogService} from '../../../shared/services/dialog.service';
import {CustomizerService} from '../../../shared/services/customizer.service';
import {AfterUpdateWarehouseSuccess, StartUpdateWarehouse} from '../../../shared/store/warehouse/warehouse.actions';
import {Subscription} from 'rxjs';
import {WarehouseParamModel} from '../../../shared/models/warehouse/warehouse-param.model';

@Component({
  selector: 'app-edit-warehouse',
  templateUrl: './edit-warehouse.component.html',
  styleUrls: ['./edit-warehouse.component.scss']
})
export class EditWarehouseComponent implements OnInit, OnDestroy {

  @ViewChild('editWarehouseLocation', {static: false})
  public editWarehouseSearchElementRef: ElementRef;
  latitude: number;
  longitude: number;
  zoom: number;
  editWarehouseFormGroup: FormGroup;
  warehouseInfo: WarehouseInfo = this.data.rowData;
  statusData = ['ACTIVE', 'INACTIVE', 'HOLD'];
  storeSubscription: Subscription;
  warehouseData: WarehouseInfo[];

  constructor(private configService: ConfigService, private backendApiService: BackendApiService,
              private spinner: NgxSpinnerService,
              private dialogRef: MatDialogRef<EditWarehouseComponent>,
              private mapService: MapService, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any, public store: Store<fromApp.AppState>,
              private dialogService: DialogService, private customizerService: CustomizerService) {
  }


  ngOnInit() {
    this.loadCurrentLocation().then();
    this.loadGoogleMap();
    this.editWarehouseForm();
  }

  editWarehouseForm() {
    this.editWarehouseFormGroup = this.formBuilder.group({
      address: [''],
      warehouseName: [this.warehouseInfo.depotName],
      status: [this.warehouseInfo.depotStatus, Validators.required],
      warehouseNumber: [this.warehouseInfo.depotNumber , Validators.required]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editWarehouseFormGroup.controls[controlName].hasError(errorName);
  }

  loadGoogleMap() {
    this.mapsAPILoader.load().then(() => {
      // this.getCurrentLocation();
      const autocomplete = new google.maps.places.Autocomplete(this.editWarehouseSearchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            // reject();
            return;
          }
          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  async loadCurrentLocation() {
    const googleMapReturnCurrentAddress = await this.mapService.getAddress(Number(this.warehouseInfo.depotLatitude), Number(this.warehouseInfo.depotLongitude));
    // @ts-ignore
    this.editWarehouseFormGroup.get('address').setValue(googleMapReturnCurrentAddress.address);
  }

  updateWarehouse() {
    const requestParam = this.warehouseInfo.depotId + '/' + this.editWarehouseFormGroup.get('status').value;
    this.store.dispatch(new StartUpdateWarehouse(requestParam));
    this.storeSubscription = this.store.select('warehouse').subscribe(value => {
      if (value.save_warehouse_success !== null) {
        this.dialogService.openSuccessDialog('Warehouse Updated Successfully');
        this.warehouseData = value.WAREHOUSE_DATA.slice();
        this.customizerService.deleteWarehouse(this.warehouseData, this.warehouseInfo.depotId);
        this.warehouseData.push(value.save_warehouse_success);
        this.store.dispatch(new AfterUpdateWarehouseSuccess(this.warehouseData));
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
