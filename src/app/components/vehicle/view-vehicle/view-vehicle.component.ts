import {Component, Inject, OnInit} from '@angular/core';
import {ConfigService} from '../../../shared/services/config.service';
import {BackendApiService} from '../../../shared/services/backendapi.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {
  AdvancedLayout, ButtonEvent,
  ButtonsConfig,
  ButtonsStrategy, ButtonType,
  Image,
  KS_DEFAULT_BTN_CLOSE,
  KS_DEFAULT_BTN_DOWNLOAD, PlainGalleryConfig, PlainGalleryStrategy
} from '@ks89/angular-modal-gallery';
import {VehicleInfo} from '../../../shared/models/vehicle/vehicle-info';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.scss']
})
export class ViewVehicleComponent implements OnInit {

  constructor(private configService: ConfigService , private backendApiService: BackendApiService,
              private spinner: NgxSpinnerService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog, private dialogRef: MatDialogRef<ViewVehicleComponent>) {
  }

  vehicleInfo: VehicleInfo = this.data.rowData;
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
  }

  openImageModalRowDescription(imgIndex: number) {
    console.log(this.imagesRect.length);
    const index: number = ViewVehicleComponent.getCurrentIndexCustomLayout(this.imagesRect[imgIndex], this.imagesRect);
    this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, { layout: new AdvancedLayout(index, true) });
  }

  onClose() {
    this.dialogRef.close();
  }

}
