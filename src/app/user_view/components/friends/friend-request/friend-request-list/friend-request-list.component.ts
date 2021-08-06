import { UserService } from 'src/app/user_view/services/user.service';
import { Observable } from 'rxjs';
import { User } from './../../../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'friend-request-list',
  templateUrl: './friend-request-list.component.html',
  styleUrls: ['./friend-request-list.component.scss'],
})
export class FriendRequestListComponent implements OnInit {
  @Input('currentUser') currentUser!: User;
  friendReques$! : Observable<User[] | undefined>;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if(this.currentUser){
      // this.userService.sendFriendRequest(this.currentUser, '0LXiOeRz9bK81h3GuCLn')
      this.friendReques$ = this.userService.getFriendRequest('0LXiOeRz9bK81h3GuCLn')
    }
  }
}
