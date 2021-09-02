import { UserService } from 'src/app/social-network/services/user.service';
import { User } from '../../../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import {
  bounceInOnEnterAnimation,
} from 'angular-animations';
@Component({
  selector: 'friend-request-card',
  templateUrl: './friend-request-card.component.html',
  styleUrls: ['./friend-request-card.component.scss'],
  animations: [
    bounceInOnEnterAnimation({anchor: 'enter'}),
  ],
})
export class FriendRequestCardComponent implements OnInit {
  constructor(private userService: UserService) {}
  @Input('user') user$!: User;
  @Input('currentUser') currentUser$!: User;

  ngOnInit(): void {}

  friendAccept(friend: User){
    if(this.currentUser$){
      this.userService.friendAccept(this.currentUser$, friend)
    }
  }
}
