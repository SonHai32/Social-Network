import { getUserSelector } from 'src/app/social-network/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { MessageService } from './../../../services/message.service';
import { PrivateMessage} from './../../../models/message.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  messageList$!: Observable<string[]>;
  constructor(private messageService: MessageService, private store: Store) {}

  ngOnInit(): void {
    this.store.select(getUserSelector).subscribe((user) => {
      if (user) {
        // this.messageService.getMessageList(user.id).subscribe(val => console.log(val))
        this.messageList$ = this.messageService.getMessageList(user.id);
      }
    });
  }
}
