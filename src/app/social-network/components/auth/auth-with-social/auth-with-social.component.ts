import { AuthActions } from '../../../store/auth/auth.action';
import { Store } from '@ngrx/store';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { Component, OnInit } from '@angular/core';

@Component({
  providers: [LoginComponent, RegisterComponent],
  selector: 'auth-with-social',
  templateUrl: './auth-with-social.component.html',
  styleUrls: ['./auth-with-social.component.scss']
})
export class AuthWithSocialComponent implements OnInit {
  constructor(private store: Store) { }

  ngOnInit(): void {
  }


  googleLogin(): void{
    this.store.dispatch(AuthActions.LoginWithPopup({popupType: 'GOOGLE'}))
  }

  githubLogin(): void{
    this.store.dispatch(AuthActions.LoginWithPopup({popupType: 'GITHUB'}))
  }


  facebookLogin(): void{
    this.store.dispatch(AuthActions.LoginWithPopup({popupType: 'FACEBOOK'}))
  }

}
