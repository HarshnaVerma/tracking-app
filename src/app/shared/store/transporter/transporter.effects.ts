import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as TransporterActions from './transporter.actions';
import {map, switchMap} from 'rxjs/operators';
import {ConfigService} from '../../services/config.service';
import {TransporterInfo} from '../../models/transporter/transporter-info';
import {GetTransporterListSuccess} from './transporter.actions';

const httpHeaders = new HttpHeaders();
httpHeaders.set('Content-Type', 'application/x-www-form-urlencoded');

@Injectable()
export class TransporterEffects {
  constructor(private actions$: Actions,
              private http: HttpClient, private configService: ConfigService) {
  }

  @Effect()
  getTransporterInfo = this.actions$.pipe(
    ofType(TransporterActions.START_GET_TRANSPORTER_LIST),
    switchMap((transporter: TransporterActions.StartGetListTransporter) => {
      return this.http.get<TransporterInfo[]>( this.configService.get(this.configService.apiBaseUrlForDriverService, 'URL_TRANSPORTER'))
        .pipe(
          map(transporterInfo => {
            return new GetTransporterListSuccess(transporterInfo);
          })
        );
    })
  );

}
