import { MessageBoxComponent } from './../../components/message/message-box/message-box.component';
import { MessageListComponent } from './../../components/message/message-list/message-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MessageListComponent
      },
      {
        path: 'message/:id',
        component: MessageBoxComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
