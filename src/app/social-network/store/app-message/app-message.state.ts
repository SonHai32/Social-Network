import { NzMessageType } from "ng-zorro-antd/message";

export interface AppMessageState{
  code?: number
  has_message: boolean,
  message_type: NzMessageType,
  message: string
}
