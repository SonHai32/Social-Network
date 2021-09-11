import { NoDataComponent } from './layout/no-data/no-data.component';
import { NavComponent } from './../components/nav/nav.component';
import { MessageBoxComponent } from './../components/message/message-box/message-box.component';
import { MessageListComponent } from './../components/message/message-list/message-list.component';
import { SearchBoxComponent } from '../components/search-box/search-box.component';
import { NotificationContentComponent } from '../components/notification/notification-content/notification-content.component';
import { NotificationListComponent } from '../components/notification/notification-list/notification-list.component';
import { FriendInfoComponent } from '../components/friends/friend-info/friend-info.component';
import { ToHoursPipe } from '../pipes/to-hours.pipe';
import { FriendSuggestionsListComponent } from '../components/friends/friend-suggestions/friend-suggestions-list/friend-suggestions-list.component';
import { FriendComponent } from '../components/friends/friend/friend.component';
import { PostListComponent } from '../components/post/post-list/post-list.component';
import { UserInfoComponent } from '../components/user-info/user-info.component';
import { UserComponent } from '../components/user/user.component';
import { PaneRightComponent } from './layout/pane-right/pane-right.component';
import { ScrollableDirective } from '../directives/scrollable.directive';
import { ScrollToCommentDirective } from '../directives/scroll-to-comment.directive';
import { AppLoadingComponent } from './layout/app-loading/app-loading.component';
import { PostCardContentComponent } from '../components/post/post-card-content/post-card-content.component';
import { PostCreateComponent } from '../components/post/post-create/post-create.component';
import { PostContainerComponent } from '../components/post/post-container/post-container.component';
import { HomeComponent } from '../components/home/home.component';
import { PaneMenuComponent } from './layout/pane-menu/pane-menu.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { AuthWithSocialComponent } from '../components/auth/auth-with-social/auth-with-social.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { ShareModule } from './share-module.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { DefaultComponent } from '../pages/default/default.component';
import { HeaderComponent } from './layout/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendRequestListComponent } from '../components/friends/friend-request/friend-request-list/friend-request-list.component';
import { FriendRequestCardComponent } from '../components/friends/friend-request/friend-request-card/friend-request-card.component';
import { FromNowPipe } from '../pipes/from-now.pipe';
import { FriendsListComponent } from '../components/friends/friends-list/friends-list.component';
import { FriendSuggestionsCardComponent } from '../components/friends/friend-suggestions/friend-suggestions-card/friend-suggestions-card.component';
import { UserDisplayNameFilterPipe } from '../pipes/user-display-name-filter.pipe';
import { MessageListItemComponent } from '../components/message/message-list-item/message-list-item.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AuthWithSocialComponent,
    RegisterComponent,
    PaneMenuComponent,
    PaneRightComponent,
    HomeComponent,
    PostListComponent,
    PostContainerComponent,
    PostCreateComponent,
    PostCardContentComponent,
    FriendRequestListComponent,
    FriendRequestCardComponent,
    FriendsListComponent,
    FriendInfoComponent,
    FriendComponent,
    FriendSuggestionsListComponent,
    FriendSuggestionsCardComponent,
    NotificationListComponent,
    NotificationContentComponent,
    MessageListComponent,
    MessageListItemComponent,
    MessageBoxComponent,
    SearchBoxComponent,
    NoDataComponent,
    UserComponent,
    UserInfoComponent,
    FromNowPipe,
    ToHoursPipe,
    UserDisplayNameFilterPipe,
    AppLoadingComponent,
    ScrollToCommentDirective,
    ScrollableDirective,
    NavComponent,
  ],
  imports: [CommonModule, RouterModule, ShareModule],
  exports: [AppLoadingComponent, ScrollToCommentDirective, ScrollableDirective],
})
export class ShareViewModule {}
