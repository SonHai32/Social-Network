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
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authVisible: boolean = false;
  authFormSelected: string = 'LOGIN';
  isMobile: boolean = false;
  currentUser!: User;
  isAuthenticated!: boolean;

  subscription: Subscription = new Subscription();

  constructor(private dv: DeviceDetectorService, private store: Store) {}

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
  changeAuthForm(formSelected: string): void {
    this.authFormSelected = formSelected;
  }

  logout(): void {
    this.store.dispatch(AuthActions.Logout());
  }
}
