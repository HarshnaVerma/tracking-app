import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import * as UploadActions from './upload.actions';
import {map, switchMap} from 'rxjs/operators';
import {ConfigService} from '../../services/config.service';
import {UploadSuccess} from './upload.actions';
import {Upload} from '../../models/upload/upload';

@Injectable()
export class UploadEffects {
  constructor(private actions$: Actions,
              private http: HttpClient, private configService: ConfigService) {
  }

  @Effect()
  upload = this.actions$.pipe(
    ofType(UploadActions.START_UPLOAD),
    switchMap((startUpload: UploadActions.StartUpload) => {
      return this.http.post<Upload>( this.configService.get(this.configService.apiBaseUrlForStorageService, 'URL_STORAGE_SERVICE'),
        startUpload.payload)
        .pipe(
          map(uploadRes => {
            uploadRes.objectType = startUpload.objectType;
            return new UploadSuccess(uploadRes);
          })
        );
    })
  );
}
