import { MessageListItemCompModule } from './../../message/message-list-item-comp.module';
import { MessageListCompModule } from './../../message/message-list-comp.module';
import { MessageBoxCompModule } from './../../message/message-box-comp.module';
import { MessageRoutingModule } from './../../../routing/message/message-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MessageRoutingModule,
    MessageBoxCompModule,
    MessageListCompModule,
    MessageListItemCompModule,
  ]
})
export class MessageModule { }
