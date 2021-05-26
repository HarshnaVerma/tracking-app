import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import {ConfigService} from './shared/services/config.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BackendApiService} from './shared/services/backendapi.service';
import {ToastrModule} from 'ngx-toastr';
import {StoreModule} from '@ngrx/store';
import * as fromApp from './shared/store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {DriverEffects} from './shared/store/driver/driver.effects';
import {DialogService} from './shared/services/dialog.service';
import {UploadEffects} from './shared/store/upload/upload.effects';
import {HttpInterceptorProviders} from './interceptor';
import {GlobalErrorHandlers} from './error';
import {WarehouseEffects} from './shared/store/warehouse/warehouse.effects';
import {VehicleEffects} from './shared/store/vehicle/vehicle.effects';
import {TransporterEffects} from './shared/store/transporter/transporter.effects';
import {OrderEffects} from './shared/store/order/order.effects';
import {TaskEffects} from './shared/store/task/task.effects';
import {DataSharingService} from './shared/services/data-sharing.service';
import {VisitorsService} from './shared/services/visitors.service';
import {LoginComponent} from './auth/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RegisterComponent } from './register/register.component';
import {AuthInterceptor} from './_helpers/auth.interceptor';
import { MatTabsModule } from '@angular/material/tabs';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      DriverEffects,
      UploadEffects,
      WarehouseEffects,
      VehicleEffects,
      TransporterEffects,
      OrderEffects,
      TaskEffects
    ]),
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [
        ConfigService
      ],
      useFactory: (appConfigSvc: ConfigService) => {
        return () => {
          return appConfigSvc.loadConfig();
        };
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    HttpInterceptorProviders,
    GlobalErrorHandlers,
    ConfigService,
    BackendApiService,
    DialogService,
    DataSharingService,
    VisitorsService,
    AuthInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
