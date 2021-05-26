import {Component, ElementRef, Inject, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from '../../../shared/services/config.service';
import {BackendApiService} from '../../../shared/services/backendapi.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {
  AdvancedLayout, ButtonEvent,
  ButtonsConfig,
  ButtonsStrategy, ButtonType,
  Image,
  KS_DEFAULT_BTN_CLOSE,
  KS_DEFAULT_BTN_DOWNLOAD, PlainGalleryConfig, PlainGalleryStrategy
} from '@ks89/angular-modal-gallery';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MapService} from '../../../shared/services/map.service';
import {DriverInfo} from '../../../shared/models/driver/driver-info';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import {StartUpload} from '../../../shared/store/upload/upload.actions';
import {Subscription} from 'rxjs';
import {MapsAPILoader} from '@agm/core';
import {DialogService} from '../../../shared/services/dialog.service';
import {DriverParamModel} from '../../../shared/models/driver/driver-param.model';
import {AfterUpdateDriverSuccess, StartUpdateDriver} from '../../../shared/store/driver/driver.actions';
import {CustomizerService} from '../../../shared/services/customizer.service';
import {Upload} from '../../../shared/models/upload/upload';
import {DataSharingService} from "../../../shared/services/data-sharing.service";

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.scss']
})
export class EditDriverComponent implements OnInit, OnDestroy {

  constructor(private configService: ConfigService, private backendApiService: BackendApiService,
              private spinner: NgxSpinnerService,
              private dialogRef: MatDialogRef<EditDriverComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
              private mapService: MapService, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, public store: Store<fromApp.AppState>,
              private dialogService: DialogService, private customizerService: CustomizerService,
              private dataSharingService: DataSharingService) {
  }

  driverInfo: DriverInfo = this.data.rowData;
  pictureToUpload: File = null;
  public profilePictureUrl = this.configService.imagePrefix + this.driverInfo.driverProfileImageLink;
  public validIdFrontImgUrl = this.configService.imagePrefix + this.driverInfo.driverIdLink;
  public validIdBackImgUrl = this.configService.imagePrefix + this.driverInfo.driverIdBackLink;
  public profilePictureObject = this.driverInfo.driverProfileImageLink;
  public validIdFrontImgObject = this.driverInfo.driverIdLink;
  public validIdBackImgObject = this.driverInfo.driverIdBackLink;
  @ViewChild('editDriverLocation', {static: false})
  public editLocationElementRef: ElementRef;
  imagesRect: Image[] = [
    new Image(
      0,
      { // modal
        img: this.validIdFrontImgUrl
      },
    ),
    new Image(
      1,
      { // modal
        img: this.validIdBackImgUrl
      },
    ),
  ];
  driverAddress: string;
  buttonsConfigCustom: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.CUSTOM,
    buttons: [
      KS_DEFAULT_BTN_DOWNLOAD,
      KS_DEFAULT_BTN_CLOSE
    ]
  };
  editDriverFormGroup: FormGroup;
  private storeSubscription: Subscription;
  latitude: number = Number(this.driverInfo.driverLatitude);
  longitude: number = Number(this.driverInfo.driverLongitude);
  zoom: number;
  driverData: DriverInfo[];
  statusData =  ['AVAILABLE' , 'NOT_AVAILABLE'];

  countries = [
    {value: 'India', viewValue: 'India'},
    {value: 'Kenya', viewValue: 'Kenya'},
    {value: 'Australia', viewValue: 'Australia'}
  ];
  uploadObject: Upload = null;
  customPlainGalleryRowDescConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

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
    this.getCurrentAddress().then();
    this.loadGoogleMap();
    this.editDriverForm();
  }

  editDriverForm() {
    this.editDriverFormGroup = this.formBuilder.group({
      firstName: [this.driverInfo.driverFirstName, Validators.required],
      lastName: [this.driverInfo.driverLastName],
      contactNumber: [this.driverInfo.driverContact, Validators.required],
      email: [this.driverInfo.driverEmail, [Validators.required , Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      address: [this.driverAddress, Validators.required],
      city: [this.driverInfo.city, Validators.required],
      postalCode: [this.driverInfo.pinCode, Validators.required],
      country: [this.driverInfo.country, Validators.required],
      status: [this.driverInfo.driverStatus, Validators.required]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editDriverFormGroup.controls[controlName].hasError(errorName);
  }

  loadGoogleMap() {
    this.mapsAPILoader.load().then(() => {
      // this.getCurrentLocation();
      const autocomplete = new google.maps.places.Autocomplete(this.editLocationElementRef.nativeElement, {
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

  async getCurrentAddress() {
    const googleMapReturnCurrentAddress = await this.mapService.getAddress(Number(this.driverInfo.driverLatitude), Number(this.driverInfo.driverLongitude));
    // @ts-ignore
    // this.currentAddress = googleMapReturnCurrentAddress.address;
    this.editDriverFormGroup.get('address').setValue(googleMapReturnCurrentAddress.address);
  }


  uploadImage(event, type) {
    if (this.imageUploadValidation(event)) {
      return;
    }

    this.pictureToUpload = event.target.files[0];
    const formData = new FormData();
    formData.append('fileObject', this.pictureToUpload);
    formData.append('objectType', this.pictureToUpload.name.substring(this.pictureToUpload.name.lastIndexOf('.') + 1));

    this.spinner.show().then();
    // dispatching to database
    if (type === 'profile') {
      this.store.dispatch(new StartUpload(formData, 'profile'));
    } else if (type === 'front') {
      this.store.dispatch(new StartUpload(formData, 'front'));
    } else if (type === 'back') {
      this.store.dispatch(new StartUpload(formData, 'back'));
    }

    this.storeSubscription = this.store.select('upload').subscribe(uploadState => {
      if (uploadState.upload_object !== null) {
        this.uploadObject = uploadState.upload_object;
        if (uploadState.upload_object.objectType === 'profile') {
          this.profilePictureUrl = this.configService.imagePrefix + uploadState.upload_object.objectName;
          this.profilePictureObject = uploadState.upload_object.objectName;
        } else if (uploadState.upload_object.objectType === 'front') {
          this.validIdFrontImgUrl = this.configService.imagePrefix + uploadState.upload_object.objectName;
          this.validIdFrontImgObject = uploadState.upload_object.objectName;
          this.imagesRect.push(new Image(
            0,
            { // modal
              img: this.validIdFrontImgUrl,
              description: 'Front Id Image'
            },
          ));
        } else if (uploadState.upload_object.objectType === 'back') {
          this.validIdBackImgUrl = this.configService.imagePrefix + uploadState.upload_object.objectName;
          this.validIdBackImgObject = uploadState.upload_object.objectName;
          this.imagesRect.push(new Image(
            1,
            { // modal
              img: this.validIdBackImgUrl,
              description: 'Back Id Image'
            },
          ));
        }
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
    const index: number = EditDriverComponent.getCurrentIndexCustomLayout(this.imagesRect[imgIndex], this.imagesRect);
    this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, {layout: new AdvancedLayout(index, true)});
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  updateDriver() {
    if (this.validIdFrontImgUrl === null) {
      this.dialogService.openErrorDialog('Please upload valid id front image');
      return;
    } else if (this.validIdBackImgUrl === null) {
      this.dialogService.openErrorDialog('Please upload valid id back image');
      return;
    }
    const driverParam: DriverParamModel = new DriverParamModel();
    driverParam.driverId = this.driverInfo.driverId;
    driverParam.driverFirstName = this.editDriverFormGroup.value.firstName;
    driverParam.driverLastName = this.editDriverFormGroup.value.lastName;
    driverParam.driverContact = this.editDriverFormGroup.value.contactNumber;
    driverParam.driverEmail = this.editDriverFormGroup.value.email;
    driverParam.driverLatitude = this.latitude.toString();
    driverParam.driverLongitude = this.longitude.toString();
    driverParam.city = this.editDriverFormGroup.value.city;
    driverParam.pinCode = this.editDriverFormGroup.value.postalCode;
    driverParam.country = this.editDriverFormGroup.value.country;
    driverParam.driverProfileImageLink = this.profilePictureObject;
    driverParam.driverIdLink = this.validIdFrontImgObject;
    driverParam.driverIdBackLink = this.validIdBackImgObject;
    driverParam.driverStatus = this.editDriverFormGroup.value.status;
    driverParam.modifiedBy = sessionStorage.getItem('userId');

    this.store.dispatch(new StartUpdateDriver(driverParam));
    this.storeSubscription = this.store.select('driver').subscribe(value => {
      if (value.save_driver_success !== null) {
       // this.router.navigate(['/driver/drivers-info']).then();
        this.dialogService.openSuccessDialog('Driver Updated Successfully');
        this.driverData = value.DRIVER_DATA.slice();
        this.customizerService.deleteDriver(this.driverData , driverParam.driverId);
        this.driverData.push(value.save_driver_success);
        this.store.dispatch(new AfterUpdateDriverSuccess(this.driverData));
        this.dataSharingService.getDriverStatusInfoData();
      }
    });
  }
}
