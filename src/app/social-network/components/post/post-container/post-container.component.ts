import { getUserSelector } from '../../../store/auth/auth.selectors';
import { Subscription } from 'rxjs';
import { AppMessageAction } from '../../../store/app-message/app-message.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { getAuthSelector } from 'src/app/social-network/store/auth/auth.selectors';
import { User } from 'src/app/social-network/models/user.model';

@Component({
  selector: 'home-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
})
export class PostContainerComponent implements OnInit {
  createPostVisible: boolean = false;
  isAuthenticated!: boolean;
  subscription: Subscription = new Subscription();
  currentUser!: User;
  constructor( private store: Store) {}

  ngOnInit(): void {
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

  handlePostCreateClose(){
    this.createPostVisible = false;
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
