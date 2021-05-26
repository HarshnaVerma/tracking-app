import * as UploadActions from './upload.actions';
import {Upload} from '../../models/upload/upload';

export interface UploadState {
  upload_error: string;
  upload_object: Upload;
}

const initialState: UploadState = {
  upload_error: '',
  upload_object: null
};

export function uploadReducer(state: UploadState = initialState , action: UploadActions.UploadActions) {
  switch (action.type) {
    case UploadActions.START_UPLOAD:
      return {
        ...state,
        upload_error: '',
        upload_object: null
      };
    case UploadActions.UPLOAD_SUCCESS:
      return {
        ...state,
        upload_error: '',
        upload_object: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
