import { UserService } from 'src/app/social-network/services/user.service';
import { tap } from 'rxjs/operators';
import { vmFromLatest } from 'src/app/social-network/utils/operators';
import { AppMessageAction } from '../../store/app-message/app-message.actions';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../models/message.model';
import { getUserSelector } from 'src/app/social-network/store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../models/user.model';
import { Store, select } from '@ngrx/store';
import firebase from 'firebase/app';

interface MessageVM {
  currentUser: User;
  messages: Message[];
}

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
  friend$!: Observable<User>;
  friendID!: string;
  messageVM$!: Observable<MessageVM>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const ID: string | null = params.get('id');
      if (ID) {
        this.friend$ = this.userService.getUserInfo(ID);
        this.friendID = ID;

        this.store.select(getUserSelector).subscribe((user) => {
          if (user) {
            this.currentUser$ = user;
            this.messageVM$ = vmFromLatest<MessageVM>({
              currentUser: new Observable((sub) => sub.next(user)),
              messages: this.messageService
                .getMessage(user.id, this.friendID)
                .pipe(tap(() => this.scrollToBottom())),
            });
          }
        });
      }
    });
  }

  isDisplayTime(messageTime: Date): boolean {
    return (Date.now() - messageTime.getTime()) / 3600000 > 1;
  }
  sendMessage(chatBoxEl: HTMLTextAreaElement) {
    if (this.currentUser$ && this.friendID) {
      const message: Message = {
        send_by: this.currentUser$,
        created_at: firebase.firestore.Timestamp.now(),
        messageText: this.chatBoxValue ? this.chatBoxValue : '',
      };
      this.messageService
        .sendMessage(this.currentUser$, this.friendID, message)
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
