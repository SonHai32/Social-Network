import { UserService } from 'src/app/user_view/services/user.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user_view/models/user.model';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  @Input('currentUser') currentUser$!: User
  constructor(private userService: UserService) { }
  friendList$!: Observable<User[]>

  ngOnInit(): void {
    if(this.currentUser$){
      this.friendList$ = this.userService.getAllFriend(this.currentUser$.id)
    }
  }

}
