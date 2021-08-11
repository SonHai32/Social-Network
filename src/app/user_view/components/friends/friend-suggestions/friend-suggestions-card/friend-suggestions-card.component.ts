import { AppMessageAction } from './../../../../store/app-message/app-message.actions';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/user_view/services/user.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { bounceInOnEnterAnimation } from 'angular-animations';
import { User } from 'src/app/user_view/models/user.model';

@Component({
  selector: 'app-friend-suggestions-card',
  templateUrl: './friend-suggestions-card.component.html',
  styleUrls: ['./friend-suggestions-card.component.scss'],
  animations: [bounceInOnEnterAnimation({ anchor: 'enter' })],
})
export class FriendSuggestionsCardComponent implements OnInit {
  @Input('user') user$!: User;
  @Input('currentUser') currentUser$!: User;
  @Output('removeSuggestion') removeSuggestion: EventEmitter<string> =
    new EventEmitter();
  constructor(private userService: UserService, private store: Store) {}

  ngOnInit(): void {}
  sendFriendRequest(friend: User) {
    if (this.currentUser$) {
      this.userService.sendFriendRequest(this.currentUser$, friend);
    }
  }
}
