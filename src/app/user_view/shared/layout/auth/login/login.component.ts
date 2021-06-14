import { Component, OnInit, Output } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'user-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isMobile: boolean = false;
  expandLoginVisible = false;
  constructor(private dvDectectorService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.dvDectectorService.isMobile();
  }

  toggleLogin(): void{
    this.expandLoginVisible = !this.expandLoginVisible
  }
  

}
