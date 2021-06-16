import { ModalComponent } from './../../../shared/layout/modal/modal.component';
import { DrawerComponent } from './../../../shared/layout/drawer/drawer.component';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'user-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild(DrawerComponent) drawerComp!: DrawerComponent;
  @ViewChild(ModalComponent) modalComp!: ModalComponent;
  isMobile: boolean = false;
  constructor(private dvDectectorService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.dvDectectorService.isMobile();
  }

  toggleLogin(): void {
    if(this.isMobile){
      this.drawerComp.toggleDrawer()
    }else{
      this.modalComp.toggleModal()
    }
  }
}
