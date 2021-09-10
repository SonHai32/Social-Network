import { Router } from '@angular/router';
import { AuthActions } from './../../../store/auth/auth.action';
import { getUserSelector } from 'src/app/social-network/store/auth/auth.selectors';
import { User } from 'src/app/social-network/models/user.model';
import { Store } from '@ngrx/store';
import { NavService } from './../../../services/nav.service';
import { Component, OnInit } from '@angular/core';
import { NavOptions } from 'src/app/social-network/app-models/nav-options.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isAuthenticated: boolean = false;
  currentUser$!: Observable<User | null>;
  extendMenuVisible: boolean = false;
  constructor(
    private navService: NavService,
    private store: Store,
    private router: Router
  ) {}

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
  ngOnInit(): void {
    this.currentUser$ = this.store.select(getUserSelector);
  }
  toggleExtendMenu() {
    this.extendMenuVisible = !this.extendMenuVisible;
  }
  logOut() {
    this.store.dispatch(AuthActions.Logout());
  }

  toggleNavigation(path: 'user' | 'friends', userID?: string) {
    if (path === 'user' && userID) {
      this.router.navigate(['/user', userID]);
      this.extendMenuVisible = false;
    } else {
      this.router.navigate(['/friends']);
      this.extendMenuVisible = false;
    }
  }
}
