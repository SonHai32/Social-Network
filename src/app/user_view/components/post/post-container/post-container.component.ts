import { DeviceDetectorService } from 'ngx-device-detector';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
})
export class PostContainerComponent implements OnInit {
  createPostVisible: boolean = false;

  isMobile: boolean = false;

  constructor(private dv: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isMobile = this.dv.isMobile();
  }


  toggleCreatePost(): void {
    this.createPostVisible = !this.createPostVisible;
  }
}
