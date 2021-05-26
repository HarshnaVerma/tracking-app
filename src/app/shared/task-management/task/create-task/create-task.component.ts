import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MapService} from '../../../services/map.service';
import {MapsAPILoader} from '@agm/core';
import {DriverAssignmentListComponent} from '../../driver/driver-assignment-list/driver-assignment-list.component';
import {MatDialog} from '@angular/material/dialog';
import {WarehouseInfo} from '../../../models/warehouse/warehouse-info';
import {OrdersInfo} from '../../../models/order/orders-info';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {StartGetListWarehouse} from '../../../store/warehouse/warehouse.actions';
import {Subscription} from 'rxjs';
import {StartGetListOrder} from '../../../store/order/order.actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogService} from '../../../services/dialog.service';
import {TaskParamModel} from '../../../models/task/task-param.model';
import {StartAddTask} from '../../../store/task/task.actions';
import {formatDate} from '@angular/common';
import {TaskInfoComponent} from '../task-info/task-info.component';
import {DataSharingService} from '../../../services/data-sharing.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {BackendApiService} from '../../../services/backendapi.service';
import {ConfigService} from '../../../services/config.service';
import {VehicleInfo} from '../../../models/vehicle/vehicle-info';
import {StartGetListVehicle} from '../../../store/vehicle/vehicle.actions';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit, OnDestroy {

  @ViewChild('dropLocation')
  public dropLocationElementRef: ElementRef;
  latitude: number;
  longitude: number;
  zoom: number;
  currentAddress: string;
  showTimePicker: boolean;
  time: any;
  meridian = true;
  warehouseInfo: WarehouseInfo[];
  ordersInfo: OrdersInfo[];
  storeSubscription: Subscription;
  createTaskFormGroup: FormGroup;
  selectedDay = 0;
  selectedDrivers = [];
  deliveryDateAndTime: string;
  @ViewChild(TaskInfoComponent) taskInfoComponent;
  calculatedFare: number;
  depotLatitude: string;
  depotLongitude: string;
  baseFare: number;
  totalFare: number;
  vehicleInfo: VehicleInfo[];
  vehicleTypeArr = ['TWO_WHEELER', 'THREE_WHEELER', 'FOUR_WHEELER', 'SIX_WHEELER', 'EIGHT_WHEELER'];

  constructor(private mapService: MapService, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private dialog: MatDialog, public store: Store<fromApp.AppState>,
              private formBuilder: FormBuilder, public dialogService: DialogService,
              private dataSharingService: DataSharingService, private spinnerService: NgxSpinnerService,
              private backendApiService: BackendApiService, private configService: ConfigService) {
  }

  ngOnInit(): void {
    // this.getCurrentTime();
    this.createTaskForm();
    this.getWareHouseInfo();
  //  this.getVehicleInfo();
    this.getOrdersInfo();
    this.loadCurrentLocation().then();
    this.loadGoogleMap();
  }

  getCurrentTime() {
    const curDate = new Date();
    this.time = {hour: curDate.getHours(), minute: curDate.getMinutes()};
  }

  createTaskForm() {
    this.createTaskFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      contactNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      orderId: ['', Validators.required],
      warehouse: ['', Validators.required],
      amount: ['', Validators.required],
      dropLocation: ['', Validators.required],
      paymentType: ['', Validators.required],
      when: ['', Validators.required],
      vehicleType: ['' , Validators.required]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.createTaskFormGroup.controls[controlName].hasError(errorName);
  }

  getWareHouseInfo() {
    this.store.dispatch(new StartGetListWarehouse());
    this.storeSubscription = this.store.select('warehouse').subscribe(value => {
      this.warehouseInfo = value.WAREHOUSE_DATA;
    });
  }

  getVehicleInfo() {
   this.backendApiService.callGetApi(this.configService.get(this.configService.apiBaseUrlForDriverService ,
     'URL_VEHICLE')).subscribe(response => {
       this.vehicleInfo = response;
   });
  }

  getOrdersInfo() {
    this.backendApiService.callGetApi(this.configService.
    get(this.configService.apiBaseUrlForOrderService , 'GET_ORDER_BY_STATUS')
      + '/INITIATED').
    subscribe(response => {
      this.ordersInfo = response;
    });
  }

  isNumberKey(evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }

  loadGoogleMap() {
    this.mapsAPILoader.load().then(() => {
      // this.getCurrentLocation();
      const autocomplete = new google.maps.places.Autocomplete(this.dropLocationElementRef.nativeElement, {
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
          this.getDistanceAndFare();
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

    const googleMapReturnCurrentAddress = await this.mapService.getAddress(this.latitude, this.longitude);
    // @ts-ignore
    this.currentAddress = googleMapReturnCurrentAddress.address;
    this.createTaskFormGroup.get('dropLocation').setValue(this.currentAddress);
  }


  toTimePicker($event) {
    this.getCurrentTime();
    this.showTimePicker = $event.value === 2;
  }

  getSelectedDay($event) {
    this.selectedDay = $event.value;
  }

  assignDriver() {
    this.dialog.open(DriverAssignmentListComponent, {
      width: '300px',
      data: {selectedDriver: this.selectedDrivers,
        vehicleType: this.createTaskFormGroup.get('vehicleType').value ,
        depotLatitude: this.createTaskFormGroup.get('warehouse').value.depotLatitude,
        depotLongitude: this.createTaskFormGroup.get('warehouse').value.depotLongitude},
      backdropClass: 'backdropBackground'
    }).afterClosed().subscribe(response => {
      this.selectedDrivers = response;
    });
  }

  createTask() {
    const currentDate = new Date();
    if (this.showTimePicker) {
      if (this.selectedDay === 0) {
        this.dialogService.openErrorDialog('Please select a day');
        return;
      } else if (this.selectedDay === 1) {
        this.deliveryDateAndTime = formatDate(currentDate, 'dd-MM-yyyy', 'en');
        this.deliveryDateAndTime = this.deliveryDateAndTime + ' ' + this.time.hour + ':' + this.time.minute;
      } else if (this.selectedDay === 2) {
        this.deliveryDateAndTime = formatDate(new Date(currentDate.setDate(currentDate.getDate() + 1)), 'dd-MM-yyyy', 'en');
        this.deliveryDateAndTime = this.deliveryDateAndTime + ' ' + this.time.hour + ':' + this.time.minute;
      }
    } else {
      this.deliveryDateAndTime = formatDate(currentDate, 'dd-MM-yyyy HH:mm', 'en');
    }

    const taskParam: TaskParamModel = new TaskParamModel();
    taskParam.customerName = this.createTaskFormGroup.get('name').value;
    taskParam.contactNumber = this.createTaskFormGroup.get('contactNo').value;
    taskParam.customerEmail = this.createTaskFormGroup.get('email').value;
    taskParam.orderId = this.createTaskFormGroup.get('orderId').value;
    taskParam.wareHouseId = this.createTaskFormGroup.get('warehouse').value.depotId;
    taskParam.dropLatitude = this.latitude.toString();
    taskParam.dropLongitude = this.longitude.toString();
    taskParam.amount = this.calculatedFare.toString();
    taskParam.paymentType = this.createTaskFormGroup.get('paymentType').value === 1 ? 'CASH_ON_DELIVERY' : '';
    taskParam.assignDrivers = this.selectedDrivers;
    taskParam.createdBy = sessionStorage.getItem('userId');
    taskParam.deliveryDate = this.deliveryDateAndTime;
    taskParam.dropAddress = this.dropLocationElementRef.nativeElement.value;
    taskParam.baseFare = this.baseFare.toString();
    taskParam.totalFare = this.totalFare.toString();
    taskParam.vehicleType = this.createTaskFormGroup.get('vehicleType').value;

    this.store.dispatch(new StartAddTask(taskParam));
    this.storeSubscription = this.store.select('task').subscribe(value => {
      console.log('val: ' + JSON.stringify(value));
      if (value.save_task_success !== null) {
        this.dialogService.openSuccessDialog('Task Created Successfully');
        this.dataSharingService.getTaskStatusInfoData();
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  getDistanceAndFare() {
    this.depotLatitude = this.createTaskFormGroup.get('warehouse').value.depotLatitude;
    this.depotLongitude = this.createTaskFormGroup.get('warehouse').value.depotLongitude;
    if (this.latitude && this.longitude && this.depotLatitude && this.depotLongitude) {
      console.log('depo lat: ' + this.depotLatitude + ' depo long: ' + this.depotLongitude);
      const request = {
        destinationLatitude: this.latitude.toString(),
        destinationLongitude: this.longitude.toString(),
        originLatitude: this.depotLatitude,
        originLongitude: this.depotLongitude
      };
      // this.spinnerService.show().then();
      this.backendApiService.postMapping(this.configService.apiBaseUrlForTaskService + '/task/amount' ,
        request).then(response => {
        if (response !== null ) {
          this.calculatedFare = response.fareAmount;
          this.baseFare = response.baseFare;
          this.totalFare = this.calculatedFare + this.baseFare;
          this.createTaskFormGroup.get('amount').setValue(this.totalFare);
          //  this.spinnerService.hide().then();
        }
      });
    }
  }

  getDepotCoordinates(event) {
    this.getDistanceAndFare();
  }


  changeDropLoc() {
    this.getDistanceAndFare();
  }
}
