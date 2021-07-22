import { NzMessageType } from 'ng-zorro-antd/message';
import { createAction, props} from '@ngrx/store';


export enum AppMessageTypes{
  SET_APP_MESSAGE       =   '[APP_MESSAGE] SET_APP_MESSAGE',
  CLEAR_APP_MESSAGE     =   '[APP_MESSAGE] CLEAR_APP_MESSAGE'
}


export const SetAppMessage = createAction(AppMessageTypes.SET_APP_MESSAGE, props<{message: string, message_type: NzMessageType}>())
export const ClearAppMessage = createAction(AppMessageTypes.CLEAR_APP_MESSAGE)


export const AppMessageAction = {
  SetAppMessage,
  ClearAppMessage
}
