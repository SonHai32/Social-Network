import { ErrorActions } from './../../../store/error/error.actions';
import { AuthActions } from './../../../store/auth/auth.action';
import { Store } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Component, OnInit } from '@angular/core';
import { getAuthSelector } from 'src/app/user_view/store/auth/auth.selectors';

@Component({
  selector: 'home-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
})
export class PostContainerComponent implements OnInit {
  createPostVisible: boolean = false;
  isAuthenticated!: boolean;
  isMobile: boolean = false;

  constructor(private dv: DeviceDetectorService, private store: Store) {}

  ngOnInit(): void {
    this.isMobile = this.dv.isMobile();
    this.store
      .select(getAuthSelector)
      .subscribe(
        (authenticated: boolean) => (this.isAuthenticated = authenticated)
      );
  }

  toggleCreatePost(): void {
    if (this.isAuthenticated) {
      this.createPostVisible = !this.createPostVisible;
    }else{
      this.store.dispatch(ErrorActions.SetError({errorMessage: 'Vui lòng đăng nhập để tiếp tục'}))
    }
  }
}
