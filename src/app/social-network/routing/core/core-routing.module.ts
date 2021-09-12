import { HomeComponent } from './../../components/home/home.component';
import { CoreComponent } from './../../components/core/core.component';
import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['/']);
const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../modules/feature/post/post.module').then(
                (m) => m.PostModule
              ),
          },
          {
            path: 'user/:id',
            loadChildren: () =>
              import('./../../modules/feature/user/user.module').then(
                (m) => m.UserModule
              ),
          },
          {
            path: 'friends',
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe: redirectUnauthorizedToHome },
            loadChildren: () =>
              import('./../../modules/feature/friend/friend.module').then(
                (m) => m.FriendModule
              ),
          },
          {
            path: 'messages',
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe: redirectUnauthorizedToHome },
            loadChildren: () =>
              import('./../../modules/feature/message/message.module').then(
                (m) => m.MessageModule
              ),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
