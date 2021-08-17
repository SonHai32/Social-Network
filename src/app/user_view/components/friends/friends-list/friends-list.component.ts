import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { UserService } from 'src/app/user_view/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from 'src/app/user_view/models/user.model';
import { UserStatus } from 'src/app/user_view/types/user-status.type';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss'],
})
export class FriendsListComponent implements OnInit {
  @Input('currentUser') currentUser$!: User;
  constructor(private userService: UserService) {}
  friendList$!: Observable<User[]>;
  friendLimit: number = 8;
  searchFilter: string = '';
  ngOnInit(): void {
    if (this.currentUser$) {
      this.friendList$ = this.userService.getAllFriend(this.currentUser$.id);
    }
  }


}
