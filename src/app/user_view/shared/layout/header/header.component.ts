import { vmFromLatest } from 'src/app/user_view/utils/operators';
import { Post } from './../../../models/post.model';
import { UserService } from 'src/app/user_view/services/user.service';
import { NotificationService } from './../../../services/notification.service';
import { AppMessageAction } from './../../../store/app-message/app-message.actions';
import { AuthActions } from './../../../store/auth/auth.action';
import {
  getUserSelector,
  getAuthSelector,
} from './../../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/user_view/models/user.model';
import { PostsService } from 'src/app/user_view/services/posts.service';
interface SearchVM{
  users: User[],
  posts: Post[]
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  searchVM$!: Observable<SearchVM>
  authVisible: boolean = false;
  authFormSelected: string = 'LOGIN';
  notificationVisible: boolean = false;
  searchVisible: boolean = false;
  isMobile: boolean = false;
  currentUser!: User;
  isAuthenticated!: boolean;
  totalUnseenNotification!: Observable<number>;
  subscription: Subscription = new Subscription();

  constructor(
    private dv: DeviceDetectorService,
    private store: Store,
    private userNotificationService: NotificationService,
    private userService: UserService,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.dv.isMobile();
    this.subscription.add(
      this.store.select(getAuthSelector).subscribe((authenticated: boolean) => {
        this.isAuthenticated = authenticated;
      })
    );
    this.subscription.add(
      this.store.select(getUserSelector).subscribe((user: User | null) => {
        if (user) {
          this.currentUser = user;
          this.totalUnseenNotification =
            this.userNotificationService.getUnseenNotification(user.id);
        }
      })
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  toggleAuth(formSelect?: string): void {
    this.authVisible = !this.authVisible;
    if (formSelect) {
      this.changeAuthForm(formSelect);
    }
  }
  toggleNotification() {
    if (this.currentUser) {
      this.notificationVisible = !this.notificationVisible;
    } else {
      this.store.dispatch(
        AppMessageAction.SetAppMessage({
          message: 'Bạn chưa đăng nhập',
          message_type: 'warning',
        })
      );
    }
  }
  toggleSearch(){
    this.searchVisible = !this.searchVisible
  }
  changeAuthForm(formSelected: string): void {
    this.authFormSelected = formSelected;
  }

  handleSearchChange(value: string){
    this.searchVM$ = vmFromLatest<SearchVM>({
      users: this.userService.searchUser(value),
      posts: this.postService.searchPost(value)
    })
  }
  logout(): void {
    this.store.dispatch(AuthActions.Logout());
  }
}
