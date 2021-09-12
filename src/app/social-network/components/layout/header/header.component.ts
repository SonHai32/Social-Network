import { tap } from 'rxjs/operators';
import { AuthActions } from '../../../store/auth/auth.action';
import {
  getUserSelector,
} from '../../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/social-network/models/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authVisible: boolean = false;
  authFormSelected: string = 'LOGIN';
  currentUser$!: Observable<User | null>;
  isAuthenticated!: boolean;

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
   this.currentUser$ = this.store.select(getUserSelector).pipe(tap((user =>{
     if(user){
       this.isAuthenticated = true
     }else
     this.isAuthenticated = false
   })))
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
