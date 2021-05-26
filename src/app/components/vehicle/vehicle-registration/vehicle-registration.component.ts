import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  AdvancedLayout,
  ButtonEvent,
  ButtonsConfig,
  ButtonsStrategy,
  ButtonType,
  Image, KS_DEFAULT_BTN_CLOSE, KS_DEFAULT_BTN_DOWNLOAD, PlainGalleryConfig, PlainGalleryStrategy
} from '@ks89/angular-modal-gallery';
import {ConfigService} from '../../../shared/services/config.service';
import {BackendApiService} from '../../../shared/services/backendapi.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatDialogRef} from '@angular/material/dialog';
import {TransporterInfo} from '../../../shared/models/transporter/transporter-info';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import * as TransporterActions from '../../../shared/store/transporter/transporter.actions';
import {DriverInfo} from '../../../shared/models/driver/driver-info';
import * as DriverActions from '../../../shared/store/driver/driver.actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StartUpload} from '../../../shared/store/upload/upload.actions';
import {Upload} from '../../../shared/models/upload/upload';
import {DialogService} from '../../../shared/services/dialog.service';
import {VehicleParamModel} from '../../../shared/models/vehicle/vehicle-param.model';
import {StartAddVehicle} from '../../../shared/store/vehicle/vehicle.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.scss']
})
export class VehicleRegistrationComponent implements OnInit, OnDestroy {

  constructor(private configService: ConfigService , private backendApiService: BackendApiService,
              private spinner: NgxSpinnerService,
              private dialogRef: MatDialogRef<VehicleRegistrationComponent>,
              public store: Store<fromApp.AppState>,
              private formBuilder: FormBuilder, private dialogService: DialogService,
              private router: Router) {
  }

  public vehicleRcPictureUrl: any = null;
  vehiclePictureToUpload: File = null;
  imagesRect: Image[] = new Array <Image> ();
  buttonsConfigCustom: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.CUSTOM,
    buttons: [
      KS_DEFAULT_BTN_DOWNLOAD,
      KS_DEFAULT_BTN_CLOSE
    ]
  };
  customPlainGalleryRowDescConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };
  transporterInfo: TransporterInfo[];
  driverInfo: DriverInfo[];
  storeSubscription: Subscription;
  addVehicleFormGroup: FormGroup;
  uploadObject: Upload = null;
  vehicleTypeArr = ['TWO_WHEELER', 'THREE_WHEELER', 'FOUR_WHEELER', 'SIX_WHEELER', 'EIGHT_WHEELER'];

  static getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
    return image ? images.indexOf(image) : -1;
  }

  onButtonBeforeHook(event: ButtonEvent) {
    if (!event || !event.button) {
      return;
    }

    if (event.button.type === ButtonType.DELETE) {
      this.imagesRect = this.imagesRect.filter((val: Image) => event.image && val.id !== event.image.id);
    }
  }

  onButtonAfterHook(event: ButtonEvent) {
    if (!event || !event.button) {
      return;
    }
  }

  ngOnInit(): void {
    this.addVehicleForm();
    this.getTransporterInfo();
    this.getDriverInfo();
  }

  addVehicleForm() {
    this.addVehicleFormGroup = this.formBuilder.group({
      transporter: ['' , Validators.required],
      vehicleType: ['' , Validators.required],
      vehicleNumber: ['' , Validators.required],
      driver: ['' , Validators.required]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addVehicleFormGroup.controls[controlName].hasError(errorName);
  }

  getTransporterInfo() {
    this.store.dispatch(new TransporterActions.StartGetListTransporter());
    this.storeSubscription = this.store.select('transporter').subscribe(value => {
      this.transporterInfo = value.TRANSPORTER_DATA;
    });
  }

  getDriverInfo() {
    this.store.dispatch(new DriverActions.StartGetListDriver());
    this.storeSubscription = this.store.select('driver').subscribe(value => {
      this.driverInfo = value.DRIVER_DATA;
    });
  }

  ngOnDestroy() {
     if (this.storeSubscription) {
       this.storeSubscription.unsubscribe();
     }
  }

  uploadImage(event, type) {
    if (this.imageUploadValidation(event)) {
      return;
    }

    this.spinner.show().then();
    this.vehiclePictureToUpload = event.target.files[0];
    const formData = new FormData();
    formData.append('fileObject', this.vehiclePictureToUpload);
    formData.append('objectType', this.vehiclePictureToUpload.name.substring(this.vehiclePictureToUpload.name.lastIndexOf('.') + 1));

    this.spinner.show().then();
    this.store.dispatch(new StartUpload(formData, ''));
    this.storeSubscription = this.store.select('upload').subscribe(uploadState => {
      if (uploadState.upload_object !== null) {
        this.uploadObject = uploadState.upload_object;
        this.vehicleRcPictureUrl = this.configService.imagePrefix + uploadState.upload_object.objectName;
        this.imagesRect.push(new Image(
          0,
          { // modal
            img: this.vehicleRcPictureUrl,
            description: 'Vehicle Rc Image'
          },
        ));
        this.spinner.hide().then();
      }
    });

    if (this.uploadObject !== null && this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  imageUploadValidation(event) {
    if (event.target.files.length === 0) {
      return true;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert('Please select valid image');
      return true;
    }
  }

  openImageModalRowDescription(imgIndex: number) {
    console.log(this.imagesRect.length);
    const index: number = VehicleRegistrationComponent.getCurrentIndexCustomLayout(this.imagesRect[imgIndex], this.imagesRect);
    this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, { layout: new AdvancedLayout(index, true) });
  }

  createVehicle() {
    if (this.vehicleRcPictureUrl === null) {
      this.dialogService.openErrorDialog('Please upload vehicle RC image');
      return;
    }

    const vehicleParam: VehicleParamModel = new VehicleParamModel();
    vehicleParam.transporterId = this.addVehicleFormGroup.get('transporter').value;
    vehicleParam.vehicleType = this.addVehicleFormGroup.get('vehicleType').value;
    vehicleParam.vehicleNumber = this.addVehicleFormGroup.get('vehicleNumber').value;
    vehicleParam.driverId = this.addVehicleFormGroup.get('driver').value;
    vehicleParam.vehicleRCLink = this.vehicleRcPictureUrl;
    vehicleParam.createdBy = sessionStorage.getItem('userId');

    this.store.dispatch(new StartAddVehicle(vehicleParam));
    this.storeSubscription = this.store.select('vehicle').subscribe(value => {
      if (value.save_vehicle_success !== null) {
        this.dialogService.openSuccessDialog('Vehicle Added Successfully');
       // this.router.navigate(['/vehicle/vehicles-info']).then();
      //  this.store.dispatch(new StartGetListDriver());
      }
    });

  }

}
