import { UserInfoComponent } from './../../components/user-info/user-info.component';
import { PostListComponent } from './../../components/post/post-list/post-list.component';
import { UserComponent } from './../../components/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'info'
      },
      {
        path: 'posts', component: PostListComponent
      },
      {
        path: 'info', component: UserInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
