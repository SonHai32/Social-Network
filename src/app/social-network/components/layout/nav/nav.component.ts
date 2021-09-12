import { NavOptions } from '../../../app-models/nav-options.model';
import { NavService } from '../../../services/nav.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Notification } from '../../../models/notification.model';
import { tap } from 'rxjs/operators';
import { vmFromLatest } from 'src/app/social-network/utils/operators';
import { Post } from '../../../models/post.model';
import { UserService } from 'src/app/social-network/services/user.service';
import { NotificationService } from '../../../services/notification.service';
import { AppMessageAction } from '../../../store/app-message/app-message.actions';
import { getUserSelector } from '../../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/social-network/models/user.model';
import { PostsService } from 'src/app/social-network/services/posts.service';
import firebase from 'firebase/app';
interface SearchVM {
  users: User[];
  posts: Post[];
}

@Component({
  selector: 'header-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  searchVM$!: Observable<SearchVM>;
  notificationVisible: boolean = false;
  searchVisible: boolean = false;
  isMobile: boolean = false;
  currentUser!: User;
  isAuthenticated!: boolean;
  unseenNotification!: Observable<Notification[]>;
  subscription: Subscription = new Subscription();

  constructor(
    private dv: DeviceDetectorService,
    private store: Store,
    private userNotificationService: NotificationService,
    private userService: UserService,
    private postService: PostsService,
    private nzNotificationService: NzNotificationService,
    private router: Router,
    private navService: NavService
  ) {}

  ngOnInit(): void {
    this.navService.getOptionAsObs().subscribe((opts) => {
      if (opts != null) {
        this.toggleNav(opts);
      }
    });
    this.isMobile = this.dv.isMobile();
    this.subscription.add(
      this.store.select(getUserSelector).subscribe((user: User | null) => {
        if (user) {
          this.isAuthenticated = true;
          this.currentUser = user;
          this.unseenNotification = this.userNotificationService
            .getUnseenNotification(user.id)
            .pipe(
              tap((notifications: Notification[]) => {
                notifications.forEach((val) => {
                  if (
                    firebase.firestore.Timestamp.now().seconds -
                      val.created_at.seconds <
                    2
                  ) {
                    this.nzNotificationService.blank(
                      val.byUser.display_name,
                      val.title
                    );
                  }
                });
              })
            );
        }
      })
    );
  }
  toggleNavOptions(
    option: 'messages' | 'notifications' | 'friends' | 'search'
  ) {
    switch (option) {
      case 'messages':
        this.navService.setNavOption(NavOptions.messages);
        break;
      case 'notifications':
        this.navService.setNavOption(NavOptions.notifications);
        break;
      case 'friends':
        this.navService.setNavOption(NavOptions.friends);
        break;
      case 'search':
        this.navService.setNavOption(NavOptions.search);
        break;
      default:
        return;
    }
  }

  toggleNav(option: NavOptions) {
    if (this.currentUser) {
      switch (option) {
        case NavOptions.messages:
          this.router.navigate(['/messages']);
          break;
        case NavOptions.notifications:
          this.toggleNotification();
          break;
        case NavOptions.friends:
          this.router.navigate(['/friends']);
          break;
        case NavOptions.search:
          this.toggleSearch();
          break;
        default:
          return;
      }
    } else {
      this.store.dispatch(
        AppMessageAction.SetAppMessage({
          message: 'Bạn chưa đăng nhập',
          message_type: 'warning',
        })
      );
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
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
  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }

  handleSearchChange(value: string) {
    this.searchVM$ = vmFromLatest<SearchVM>({
      users: this.userService.searchUser(value),
      posts: this.postService.searchPost(value),
    });
  }
}
