import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from '../../../shared/services/config.service';
import {BackendApiService} from '../../../shared/services/backendapi.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  AdvancedLayout, ButtonEvent,
  ButtonsConfig,
  ButtonsStrategy, ButtonType,
  Image,
  KS_DEFAULT_BTN_CLOSE,
  KS_DEFAULT_BTN_DOWNLOAD, PlainGalleryConfig, PlainGalleryStrategy
} from '@ks89/angular-modal-gallery';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogService} from '../../../shared/services/dialog.service';
import {TransporterInfo} from '../../../shared/models/transporter/transporter-info';
import {DriverInfo} from '../../../shared/models/driver/driver-info';
import {Subscription} from 'rxjs';
import {Upload} from '../../../shared/models/upload/upload';
import * as TransporterActions from '../../../shared/store/transporter/transporter.actions';
import * as DriverActions from '../../../shared/store/driver/driver.actions';
import {VehicleParamModel} from '../../../shared/models/vehicle/vehicle-param.model';
import {AfterUpdateVehicleSuccess, StartUpdateVehicle} from '../../../shared/store/vehicle/vehicle.actions';
import {VehicleInfo} from '../../../shared/models/vehicle/vehicle-info';
import {CustomizerService} from '../../../shared/services/customizer.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit, OnDestroy {

  constructor(private configService: ConfigService , private backendApiService: BackendApiService,
              private spinner: NgxSpinnerService,
              private dialogRef: MatDialogRef<EditVehicleComponent>,
              public store: Store<fromApp.AppState>,
              private formBuilder: FormBuilder, private dialogService: DialogService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private customizerService: CustomizerService) {
  }

  vehicleInfo: VehicleInfo = this.data.rowData;
  public vehicleRcPictureUrl =  this.vehicleInfo.vehicleRCLink;
  // vehiclePictureToUpload: File = null;
  imagesRect: Image[] = [
    new Image(
      0,
      { // modal
        img: this.vehicleInfo.vehicleRCLink
      },
    )
  ];
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
  editVehicleFormGroup: FormGroup;
  // uploadObject: Upload = null;
  // vehicleTypeArr = ['TWO_WHEELER', 'THREE_WHEELER', 'FOUR_WHEELER', 'SIX_WHEELER', 'EIGHT_WHEELER'];
  vehicleData: VehicleInfo[];

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
    this.editVehicleFormGroup = this.formBuilder.group({
      transporter: [this.vehicleInfo.transporterName , Validators.required],
      vehicleType: [this.vehicleInfo.vehicleType , Validators.required],
      vehicleNumber: [this.vehicleInfo.vehicleNumber , Validators.required],
      driver: [this.vehicleInfo.driverId , Validators.required]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editVehicleFormGroup.controls[controlName].hasError(errorName);
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

  // uploadImage(event, type) {
  //   if (this.imageUploadValidation(event)) {
  //     return;
  //   }
  //
  //   this.spinner.show().then();
  //   this.vehiclePictureToUpload = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append('fileObject', this.vehiclePictureToUpload);
  //   formData.append('objectType', this.vehiclePictureToUpload.name.substring(this.vehiclePictureToUpload.name.lastIndexOf('.') + 1));
  //
  //   this.spinner.show().then();
  //   this.store.dispatch(new StartUpload(formData, ''));
  //   this.storeSubscription = this.store.select('upload').subscribe(uploadState => {
  //     if (uploadState.upload_object !== null) {
  //       this.uploadObject = uploadState.upload_object;
  //       this.vehicleRcPictureUrl = this.configService.imagePrefix + uploadState.upload_object.objectName;
  //       this.imagesRect.push(new Image(
  //         0,
  //         { // modal
  //           img: this.vehicleRcPictureUrl,
  //           description: 'Vehicle Rc Image'
  //         },
  //       ));
  //       this.spinner.hide().then();
  //     }
  //   });
  //
  //   if (this.uploadObject !== null && this.storeSubscription) {
  //     this.storeSubscription.unsubscribe();
  //   }
  // }

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
    const index: number = EditVehicleComponent.getCurrentIndexCustomLayout(this.imagesRect[imgIndex], this.imagesRect);
    this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, { layout: new AdvancedLayout(index, true) });
  }

  updateVehicle() {
    if (this.vehicleRcPictureUrl === null) {
      this.dialogService.openErrorDialog('Please upload vehicle RC image');
      return;
    }

    const vehicleParam: VehicleParamModel = new VehicleParamModel();
    vehicleParam.driverId = this.editVehicleFormGroup.get('driver').value;
    vehicleParam.modifiedBy = sessionStorage.getItem('userId');
    vehicleParam.vehicleId = this.vehicleInfo.vehicleId;

    this.store.dispatch(new StartUpdateVehicle(vehicleParam));
    this.storeSubscription = this.store.select('vehicle').subscribe(value => {
      if (value.save_vehicle_success !== null) {
        this.dialogService.openSuccessDialog('Vehicle Updated Successfully');
      }
    });

  }

}
