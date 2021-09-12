import { HomeComponent } from './../../components/home/home.component';
import { CoreComponent } from './../../components/core/core.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
            loadChildren: () =>
              import('./../../modules/feature/friend/friend.module').then(
                (m) => m.FriendModule
              ),
          },
          {
            path: 'messages',
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
