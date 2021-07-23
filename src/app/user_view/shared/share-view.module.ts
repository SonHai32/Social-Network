import { PostCardContentComponent } from './../components/post/post-card-content/post-card-content.component';
import { PostCreateComponent } from './../components/post/post-create/post-create.component';
import { PostContainerComponent } from './../components/post/post-container/post-container.component';
import { HomeComponent } from './../components/home/home.component';
import { PaneMenuComponent } from './layout/pane-menu/pane-menu.component';
import { LoginComponent } from './../components/auth/login/login.component';
import { AuthWithSocialComponent } from './../components/auth/auth-with-social/auth-with-social.component';
import { RegisterComponent } from './../components/auth/register/register.component';
import { ShareAntUiModule } from './share-ant-ui.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { DefaultComponent } from './../pages/default/default.component';
import { HeaderComponent } from './layout/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendRequestListComponent } from '../components/friends/friend-request/friend-request-list/friend-request-list/friend-request-list.component';
import { FriendRequestCardComponent } from '../components/friends/friend-request/friend-request-card/friend-request-card.component';
import { FromNowPipe } from '../pipes/from-now.pipe';



@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AuthWithSocialComponent,
    RegisterComponent,
    PaneMenuComponent,
    HomeComponent,
    PostContainerComponent,
    PostCreateComponent,
    PostCardContentComponent,
    FriendRequestListComponent,
    FriendRequestCardComponent,
    FromNowPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ShareAntUiModule,
  ],

})
export class ShareViewModule { }
