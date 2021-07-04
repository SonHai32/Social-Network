import { ModalComponent } from '../../../shared/layout/modal/modal.component';
import { DrawerComponent } from '../../../shared/layout/drawer/drawer.component';
import { filedType } from '../../../types/field.type';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'user-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild(DrawerComponent) drawerComp! : DrawerComponent
  @ViewChild(ModalComponent) modalComp! : ModalComponent
  isMobile: boolean = false;
  expandRegisterVisible = false;

  constructor(private dvDectectorService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.dvDectectorService.isMobile();
  }

  toggleRegister(): void {
    if(this.isMobile){
      this.drawerComp.toggleDrawer()
    }else{
       this.modalComp.toggleModal()
    }
  }
}
