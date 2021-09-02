import { map } from 'rxjs/operators';
import { UserService } from 'src/app/social-network/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/social-network/models/user.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend-suggestions-list',
  templateUrl: './friend-suggestions-list.component.html',
  styleUrls: ['./friend-suggestions-list.component.scss'],
})
export class FriendSuggestionsListComponent implements OnInit {
  @Input('currentUser') currentUser!: User;
  userSuggestions!: Observable<User[]>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.currentUser) {
      this.userSuggestions = this.userService.getFriendSuggestions(
        this.currentUser.id
      );
    }
  }

  handleSuggestionRemove(userID: any) {
    if (this.userSuggestions) {
      this.userSuggestions.pipe(
        map((res) =>
          res.map((user) => {
            console.log(user);
            return user.id !== userID;
          })
        )
      );
    }
    // console.log(userID);
  }
}
