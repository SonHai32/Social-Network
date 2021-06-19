import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
})
export class PostContainerComponent implements OnInit {
  createPostDrawerVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleCreatePostDrawer(): void {
    this.createPostDrawerVisible = !this.createPostDrawerVisible;
  }
}
