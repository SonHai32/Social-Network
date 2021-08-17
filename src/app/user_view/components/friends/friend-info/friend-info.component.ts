import { UserStatus } from './../../../types/user-status.type';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user_view/services/user.service';
import { User } from 'src/app/user_view/models/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-friend-info',
  templateUrl: './friend-info.component.html',
  styleUrls: ['./friend-info.component.scss'],
})
export class FriendInfoComponent implements OnInit {
  @Input('friend') friend!: User;
  constructor(private userService: UserService) {}
  userStatus!: Observable<UserStatus>;

  ngOnInit(): void {
    if (this.friend.id) {
      this.userStatus = this.userService.getUserPresence(this.friend.id);
    }
  }
}
