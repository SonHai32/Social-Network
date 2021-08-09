import { PostListComponent } from './../components/post/post-list/post-list.component';
import { UserComponent } from './../components/user/user.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
const routes: Routes = [
  {
    path: 'user/:id',
    component: UserComponent,
    children:[
      {path: 'posts', component: PostListComponent}
    ]

  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
