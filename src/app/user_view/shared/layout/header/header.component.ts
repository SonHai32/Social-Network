import { AuthActions } from './../../../store/auth/auth.action';
import {
  getUserSelector,
  getAuthSelector,
} from './../../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  isAuthenticated!: Observable<boolean>;
  constructor(private dv: DeviceDetectorService, private store: Store) {}

  ngOnInit(): void {
    this.isMobile = this.dv.isMobile();
    this.isAuthenticated = this.store.select(getAuthSelector);
    this.store.select(getUserSelector).subscribe((user: User | null) => {
      if (user) {
        this.currentUser = user;
      }
    });
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

  logout(): void{
    this.store.dispatch(AuthActions.Logout())
  }
}
