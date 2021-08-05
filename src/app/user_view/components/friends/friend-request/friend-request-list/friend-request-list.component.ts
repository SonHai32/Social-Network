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
      this.friendReques$ = this.userService.getFriendRequest(this.currentUser.id)
      this.friendReques$.subscribe(val => console.log(val))
    }
  }
}
