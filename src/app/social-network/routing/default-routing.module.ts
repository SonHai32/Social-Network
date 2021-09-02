import { MessageComponent } from '../components/message/message.component';
import { FriendComponent } from '../components/friends/friend/friend.component';
import { PostListComponent } from '../components/post/post-list/post-list.component';
import { PostLikeSuccess } from '../store/posts/posts.actions';
import { UserInfoComponent } from '../components/user-info/user-info.component';
import { UserComponent } from '../components/user/user.component';
import { DefaultComponent } from '../pages/default/default.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';
const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            component: PostListComponent,
          },
          {
            path: 'user/:id',
            component: UserComponent,
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'info' },
              { path: 'posts', component: PostListComponent },
              { path: 'info', component: UserInfoComponent },
            ],
          },
          {
            path: 'friends',
            component: FriendComponent,
          },
          {
            path: 'message/:id',
            component: MessageComponent
          }
        ],
      },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
