import { DeviceDetectorService } from 'ngx-device-detector';
import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authVisible: boolean = false;
  authFormSelected: string = 'LOGIN';
  isMobile: boolean = false
  constructor(private dv: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.dv.isMobile()
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
}
