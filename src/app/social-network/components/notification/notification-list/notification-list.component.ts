import { Notification } from '../../../models/notification.model';
import { NotificationService } from '../../../services/notification.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/social-network/models/user.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  @Input('currentUser') currentUser!: User;
  @Output('notificationClicked') notificationClicked = new EventEmitter<boolean>(false)
  notifications$!: Observable<Notification[]>;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    if (this.currentUser) {
      this.notifications$ = this.notificationService.getNotification(this.currentUser.id);
    }
  }
  handleNotiticationClicked(isClicked: boolean){
    this.notificationClicked.emit(isClicked)
  }
}
