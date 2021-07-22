import { getUserSelector } from './../../../store/auth/auth.selectors';
import { Subscription } from 'rxjs';
import { AppMessageAction } from '../../../store/app-message/app-message.actions';
import { AuthActions } from './../../../store/auth/auth.action';
import { Store } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Component, OnInit } from '@angular/core';
import { getAuthSelector } from 'src/app/user_view/store/auth/auth.selectors';
import { User } from 'src/app/user_view/models/user.model';

@Component({
  selector: 'home-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
})
export class PostContainerComponent implements OnInit {
  createPostVisible: boolean = false;
  isAuthenticated!: boolean;
  isMobile: boolean = false;
  subscription: Subscription = new Subscription();
  currentUser!: User;
  constructor(private dv: DeviceDetectorService, private store: Store) {}

  ngOnInit(): void {
    this.isMobile = this.dv.isMobile();
    this.subscription.add(this.store
      .select(getAuthSelector)
      .subscribe((authenticated: boolean) => {
        this.isAuthenticated = authenticated;
      }))
    this.subscription.add(
      this.store.select(getUserSelector).subscribe((user: User| null) =>{
        if(user){
          this.currentUser = user
        }
      })
    )

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  toggleCreatePost(): void {
    if (this.isAuthenticated) {
      this.createPostVisible = !this.createPostVisible;
    } else {
      this.store.dispatch(
        AppMessageAction.SetAppMessage({
          message: 'Vui lòng đăng nhập để tiếp tục',
          message_type: 'error'
        })
      );
    }
  }
}
