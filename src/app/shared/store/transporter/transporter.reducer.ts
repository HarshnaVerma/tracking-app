import * as TransporterActions from './transporter.actions';
import {TransporterInfo} from '../../models/transporter/transporter-info';


export interface TransporterState {
  TRANSPORTER_DATA: TransporterInfo[];
  fetch_transporter_error: string;
}

const initialState: TransporterState = {
  TRANSPORTER_DATA: [],
  fetch_transporter_error: ''
};

export function transporterReducer(state: TransporterState = initialState, action: TransporterActions.TransporterActions) {
  switch (action.type) {
    case TransporterActions.GET_TRANSPORTER_LIST_SUCCESS:
      return {
        ...state,
        fetch_transporter_error: '',
        TRANSPORTER_DATA: [...action.payload]
      };
    default:
      return {
        ...state
      };
  }

}
