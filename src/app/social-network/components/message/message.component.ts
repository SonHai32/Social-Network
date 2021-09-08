import { UserService } from 'src/app/social-network/services/user.service';
import { tap } from 'rxjs/operators';
import { vmFromLatest } from 'src/app/social-network/utils/operators';
import { AppMessageAction } from '../../store/app-message/app-message.actions';
import { ActivatedRoute } from '@angular/router';
import { PrivateMessage } from '../../models/message.model';
import { getUserSelector } from 'src/app/social-network/store/auth/auth.selectors';
import { Observable, Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../models/user.model';
import { Store, select } from '@ngrx/store';
import firebase from 'firebase/app';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @ViewChild('messageContainer', { static: true })
  public messageContainerRef!: CdkVirtualScrollViewport;
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private store: Store,
    private userService: UserService
  ) {}
  chatBoxValue: string | null = null;
  currentUser$!: User;
  friend!: User;
  messages$!: Observable<PrivateMessage[]>;
  subscription: Subscription = new Subscription();

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const ID: string | null = params.get('id');
      if (ID) {
        this.subscription.add(
          this.userService.getUserInfo(ID).subscribe((user: User) => {
            this.friend = user;
          })
        );
        this.subscription.add(
          this.store.select(getUserSelector).subscribe((user) => {
            if (user) {
              this.messages$ = this.messageService
                .getMessage(user.id, ID)
                .pipe(tap(() => this.scrollToBottom()));
              this.currentUser$ = user;
            }
          })
        );
      }
    });
  }

  isDisplayTime(messageTime: Date): boolean {
    return (Date.now() - messageTime.getTime()) / 3600000 > 1;
  }
  sendMessage(chatBoxEl: HTMLTextAreaElement) {
    if (this.currentUser$ && this.friend) {
      const message: PrivateMessage = {
        sendByID: this.currentUser$.id,
        created_at: firebase.firestore.Timestamp.now(),
        textMessage: this.chatBoxValue ? this.chatBoxValue : '',
      };
      this.messageService
        .sendMessage(this.currentUser$, this.friend.id, message)
        .then(() => {
          chatBoxEl.blur();
          this.chatBoxValue = '';
        })
        .catch((err) =>
          this.store.dispatch(
            AppMessageAction.SetAppMessage({
              message: err,
              message_type: 'error',
            })
          )
        );
    }
  }

  private scrollToBottom() {
    setTimeout(
      () =>
        this.messageContainerRef.scrollTo({
          bottom: 0,
          behavior: 'auto',
        }),
      0
    );
  }
}
