import { Notification } from './../../../models/notification.model';
import { NotificationService } from './../../../services/notification.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/user_view/models/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  @Input('currentUser') currentUser!: User;
  notifications$!: Observable<Notification[]>;

  data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    if (this.currentUser) {
      this.notifications$ = this.notificationService.getNotification(this.currentUser.id);
    }
  }
}
