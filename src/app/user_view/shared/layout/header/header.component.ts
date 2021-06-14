import { Component, OnInit } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMobile: boolean = false;
  expandLoginVisible = false;
  expandRegisterExample = false;
  drawerPlacement: NzDrawerPlacement = 'bottom'
  constructor(private dvDectectorService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.dvDectectorService.isMobile();
  }

  openLogin(): void {
    this.expandLoginVisible = true;
  }
  openRegister(): void {
    this.expandRegisterExample = true;
  }

  closeLogin(): void {
    this.expandLoginVisible = false;
  }
  closeRegister(): void {
    this.expandRegisterExample = false;
  }
}
