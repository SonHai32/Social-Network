import { LoginComponent } from './../auth/login/login.component';
import { RegisterComponent } from './../auth/register/register.component';
import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(RegisterComponent) registerComp!: RegisterComponent
  @ViewChild(LoginComponent) loginComp!: LoginComponent
  toggleDrawerComp = RegisterComponent;
  constructor() {}

  ngOnInit(): void {
  }

  toggleRegister(){
    this.registerComp.toggleRegister()
  }

  toggleLogin(){
    this.loginComp.toggleLogin()
  }

  
  
}
