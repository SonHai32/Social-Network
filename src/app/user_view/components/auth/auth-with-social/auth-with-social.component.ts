import { RegisterComponent } from './../register/register.component';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';

@Component({
  providers: [LoginComponent, RegisterComponent],
  selector: 'auth-with-social',
  templateUrl: './auth-with-social.component.html',
  styleUrls: ['./auth-with-social.component.scss']
})
export class AuthWithSocialComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
