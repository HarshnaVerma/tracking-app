import {Action} from '@ngrx/store';
import {TransporterInfo} from '../../models/transporter/transporter-info';

export const START_GET_TRANSPORTER_LIST = '[Transporter] Start Get Transporter List';
export const GET_TRANSPORTER_LIST_SUCCESS = '[Transporter] Get Transporter List Success';

export class StartGetListTransporter implements Action {
  type: string = START_GET_TRANSPORTER_LIST;
}

export class GetTransporterListSuccess implements Action {
  type: string = GET_TRANSPORTER_LIST_SUCCESS;
  constructor(public payload: TransporterInfo[]) {
  }
}

export type TransporterActions = any;
