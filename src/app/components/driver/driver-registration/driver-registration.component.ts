import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ConfigService} from '../../../shared/services/config.service';
import {BackendApiService} from '../../../shared/services/backendapi.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {
  AdvancedLayout, ButtonEvent,
  ButtonsConfig, ButtonsStrategy, ButtonType,
  Image, KS_DEFAULT_BTN_CLOSE, KS_DEFAULT_BTN_DOWNLOAD,
  PlainGalleryConfig,
  PlainGalleryStrategy
} from '@ks89/angular-modal-gallery';
import {MatDialogRef} from '@angular/material/dialog';
import {DriverParamModel} from '../../../shared/models/driver/driver-param.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogService} from '../../../shared/services/dialog.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../shared/store/app.reducer';
import {Subscription} from 'rxjs';
import {MapService} from '../../../shared/services/map.service';
import {MapsAPILoader} from '@agm/core';
import {StartAddDriver} from '../../../shared/store/driver/driver.actions';
// @ts-ignore
import {} from 'googlemaps';
import {StartUpload} from '../../../shared/store/upload/upload.actions';
import {Upload} from '../../../shared/models/upload/upload';
import {DataSharingService} from '../../../shared/services/data-sharing.service';


@Component({
  selector: 'app-driver-registration',
  templateUrl: './driver-registration.component.html',
  styleUrls: ['./driver-registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DriverRegistrationComponent implements OnInit, OnDestroy {

  constructor(public configService: ConfigService, private backendApiService: BackendApiService,
              private spinner: NgxSpinnerService,
              private dialogRef: MatDialogRef<DriverRegistrationComponent>,
              private formBuilder: FormBuilder, private dialogService: DialogService,
              public store: Store<fromApp.AppState>,
              private mapService: MapService, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private dataSharingService: DataSharingService) {
  }

  public profilePictureUrl: any = null;
  public validIdFrontImgUrl: any = null;
  public validIdBackImgUrl: any = null;
  public profilePictureObject = '';
  public validIdFrontImgObject = '';
  public validIdBackImgObject = '';
  pictureToUpload: File = null;
  imagesRect: Image[] = new Array<Image>();
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

  addDriverFormGroup: FormGroup;
  private storeSubscription: Subscription;
  @ViewChild('driverLocation', {static: false})
  public driverLocationElementRef: ElementRef;

  countries = [
    {value: 'India', viewValue: 'India'},
    {value: 'Kenya', viewValue: 'Kenya'},
    {value: 'Australia', viewValue: 'Australia'}
  ];

  latitude: number;
  longitude: number;
  zoom: number;
  currentAddress: string;
  uploadObject: Upload = null;
  initialCountryCode: string;

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
    this.getCountryCode();
    this.addDriverForm();
    this.loadCurrentLocation().then();
    this.loadGoogleMap();
  }

  addDriverForm() {
    this.addDriverFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addDriverFormGroup.controls[controlName].hasError(errorName);
  }


  uploadImage(event, type) {
    console.log('1111');
    if (this.imageUploadValidation(event)) {
      return;
    }

    this.pictureToUpload = event.target.files[0];
    const formData = new FormData();
    formData.append('fileObject', this.pictureToUpload);
    formData.append('objectType', this.pictureToUpload.name.substring(this.pictureToUpload.name.lastIndexOf('.') + 1));

    // dispatching to database
    this.spinner.show().then();
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
      this.dialogService.openErrorDialog('Please select valid image');
      return true;
    }
  }

  openImageModalRowDescription(imgIndex: number) {
    console.log(this.imagesRect.length);
    const index: number = DriverRegistrationComponent.getCurrentIndexCustomLayout(this.imagesRect[imgIndex], this.imagesRect);
    this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, {layout: new AdvancedLayout(index, true)});
  }

  createDriver() {
    if (this.validIdFrontImgUrl === null) {
      this.dialogService.openErrorDialog('Please upload valid id front image');
      return;
    } else if (this.validIdBackImgUrl === null) {
      this.dialogService.openErrorDialog('Please upload valid id back image');
      return;
    }
    const driverParam: DriverParamModel = new DriverParamModel();
    driverParam.driverFirstName = this.addDriverFormGroup.value.firstName;
    driverParam.driverLastName = this.addDriverFormGroup.value.lastName;
    driverParam.driverContact = this.addDriverFormGroup.value.contactNumber;
    driverParam.driverEmail = this.addDriverFormGroup.value.email;
    driverParam.driverLatitude = this.latitude.toString();
    driverParam.driverLongitude = this.longitude.toString();
    driverParam.city = this.addDriverFormGroup.value.city;
    driverParam.pinCode = this.addDriverFormGroup.value.postalCode;
    driverParam.country = this.addDriverFormGroup.value.country;
    driverParam.driverProfileImageLink = this.profilePictureObject;
    driverParam.driverIdLink = this.validIdFrontImgObject;
    driverParam.driverIdBackLink = this.validIdBackImgObject;
    driverParam.driverStatus = 'APPROVED';
    driverParam.createdBy = sessionStorage.getItem('userId');

    this.store.dispatch(new StartAddDriver(driverParam));
    this.storeSubscription = this.store.select('driver').subscribe(value => {
      if (value.save_driver_success !== null) {
        this.dialogService.openSuccessDialog('Driver Added Successfully');
        this.dataSharingService.getDriverStatusInfoData();
      }
    });

    //  this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  loadGoogleMap() {
    this.mapsAPILoader.load().then(() => {
      // this.getCurrentLocation();
      const autocomplete = new google.maps.places.Autocomplete(this.driverLocationElementRef.nativeElement, {
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

    const googleMapReturnCurrentAddress = await this.mapService.
    getAddress(this.latitude, this.longitude);
    // @ts-ignore
    // this.currentAddress = googleMapReturnCurrentAddress.address;
    this.addDriverFormGroup.get('address').setValue(googleMapReturnCurrentAddress.address);
  }

  telInputObject($event: any) {
    console.log($event);
  }

  onCountryChange($event: any) {
    console.log($event);
  }

  getNumber($event: any) {
    console.log($event);
  }

  getCountryCode() {
    console.log('country in : ');
    this.dataSharingService.userGeoLocationData.subscribe(res => {
      console.log('country in : ');
      this.initialCountryCode = res.countryCode.toLowerCase();
      console.log('country code : ' + this.initialCountryCode);
    });
  }
}
