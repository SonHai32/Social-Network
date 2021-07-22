import { NzMessageType } from 'ng-zorro-antd/message';
import { AppMessageState } from './app-message.state';
import { AppMessageAction } from './app-message.actions';
import { createReducer, on } from '@ngrx/store';

const initialState: AppMessageState = {
  has_message: false,
  message: '',
  message_type: 'info' as NzMessageType,
};
export const AppMessageReducers = createReducer(
  initialState,
  on(AppMessageAction.ClearAppMessage, () =>{
    return {
      has_message: false, message: '', message_type: 'info' as NzMessageType
    }
  }),
  on(
    AppMessageAction.SetAppMessage,
    (state: AppMessageState, { message, message_type }) => {
      return { ...state, has_message: true, message, message_type };
    }
  ),


);
