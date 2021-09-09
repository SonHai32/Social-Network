import { MessageService } from './../../../services/message.service';
import { Subscription, Observable } from 'rxjs';
import { UserService } from 'src/app/social-network/services/user.service';
import { getUserSelector } from 'src/app/social-network/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/social-network/models/user.model';

@Component({
  selector: 'app-message-list-item',
  templateUrl: './message-list-item.component.html',
  styleUrls: ['./message-list-item.component.scss'],
})
export class MessageListItemComponent implements OnInit {
  @Input('friendID') friendID!: string;
  friendInfo$!: Observable<User>;
  lastedMessage!: Observable<string>;
  subscription: Subscription = new Subscription();
  constructor(
    private store: Store,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.friendID) {

      this.friendInfo$ = this.userService.getUserInfo(this.friendID)

        this.store.select(getUserSelector).subscribe((user: User | null) => {
          if (user) {
            this.lastedMessage = this.messageService.getLastedMessage(user.id, this.friendID)
          }
        })
    }
  }
}
