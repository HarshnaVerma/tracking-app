import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from '../../../shared/services/config.service';
import {BackendApiService} from '../../../shared/services/backendapi.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatDialogRef} from '@angular/material/dialog';
import {MapService} from '../../../shared/services/map.service';
import {MapsAPILoader} from '@agm/core';
// @ts-ignore
import {} from 'googlemaps';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WarehouseParamModel} from '../../../shared/models/warehouse/warehouse-param.model';
import {StartAddWarehouse} from '../../../shared/store/warehouse/warehouse.actions';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import {DialogService} from '../../../shared/services/dialog.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-warehouse-registration',
  templateUrl: './warehouse-registration.component.html',
  styleUrls: ['./warehouse-registration.component.scss']
})
export class WarehouseRegistrationComponent implements OnInit, OnDestroy {

  @ViewChild('warehouseLocation', {static: false})
  public warehouseSearchElementRef: ElementRef;
  latitude: number;
  longitude: number;
  zoom: number;
  addWarehouseFormGroup: FormGroup;
  statusData =  ['ACTIVE' , 'INACTIVE' , 'HOLD'];
  storeSubscription: Subscription;

  constructor(private configService: ConfigService , private backendApiService: BackendApiService,
              private spinner: NgxSpinnerService,
              private dialogRef: MatDialogRef<WarehouseRegistrationComponent>,
              private mapService: MapService, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone , private formBuilder: FormBuilder, public store: Store<fromApp.AppState>,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.loadCurrentLocation().then();
    this.loadGoogleMap();
    this.addWarehouseForm();
  }

  addWarehouseForm() {
    this.addWarehouseFormGroup = this.formBuilder.group({
      address: ['' , Validators.required],
      warehouseName: ['' , Validators.required],
      status: ['' , Validators.required],
      warehouseNumber: ['', Validators.required]
    });
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.addWarehouseFormGroup.controls[controlName].hasError(errorName);
  }

  loadGoogleMap() {
    this.mapsAPILoader.load().then(() => {
      // this.getCurrentLocation();
      const autocomplete = new google.maps.places.Autocomplete(this.warehouseSearchElementRef.nativeElement, {
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
    const currentLocationCoordinates = await this.mapService.getCurrentLocation();

    // @ts-ignore
    this.latitude = currentLocationCoordinates.latitude;
    // @ts-ignore
    this.longitude = currentLocationCoordinates.longitude;
    // @ts-ignore
    this.zoom = currentLocationCoordinates.zoom;

    const googleMapReturnCurrentAddress = await this.mapService.getAddress(this.latitude , this.longitude);

    // @ts-ignore
    this.addWarehouseFormGroup.get('address').setValue(googleMapReturnCurrentAddress.address);
  }

  createWarehouse() {
    const wareHouseParam: WarehouseParamModel = new WarehouseParamModel();
    wareHouseParam.depotLatitude = this.latitude.toString();
    wareHouseParam.depotLongitude = this.longitude.toString();
    wareHouseParam.depotName = this.addWarehouseFormGroup.controls.warehouseName.value;
    wareHouseParam.depotStatus = this.addWarehouseFormGroup.controls.status.value;
    wareHouseParam.createdBy = sessionStorage.getItem('userId');
    wareHouseParam.depotNumber = this.addWarehouseFormGroup.controls.warehouseNumber.value;
    wareHouseParam.depotAddress = this.addWarehouseFormGroup.controls.address.value;

    this.store.dispatch(new StartAddWarehouse(wareHouseParam));
    this.storeSubscription = this.store.select('warehouse').subscribe(value => {
      if (value.save_warehouse_success !== null) {
        this.dialogService.openSuccessDialog('Warehouse Added Successfully');
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
