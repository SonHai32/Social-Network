import { MessageBoxComponent } from './../../components/message/message-box/message-box.component';
import { MessageListComponent } from './../../components/message/message-list/message-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['/']);
const routes: Routes = [
  {
    path: '',

    children: [
      {
        path: '',
        component: MessageListComponent,
      },
      {
        path: 'message/:id',
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToHome },
        component: MessageBoxComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageRoutingModule {}
