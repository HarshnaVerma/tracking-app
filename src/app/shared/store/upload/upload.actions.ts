import {Action} from '@ngrx/store';
import {Upload} from '../../models/upload/upload';

export const START_UPLOAD = '[Upload] Start Upload';
export const UPLOAD_SUCCESS = '[Upload] Upload Success';

export class StartUpload implements Action {
  type: string = START_UPLOAD;
  constructor(public payload: FormData , public objectType: string) {
  }
}

export class UploadSuccess implements Action {
  type: string = UPLOAD_SUCCESS;
  constructor(public payload: Upload) {
  }
}

export type UploadActions = any;
