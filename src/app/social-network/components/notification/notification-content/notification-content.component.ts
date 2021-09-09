import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';
import { Notification } from '../../../models/notification.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-content',
  templateUrl: './notification-content.component.html',
  styleUrls: ['./notification-content.component.scss'],
})
export class NotificationContentComponent implements OnInit {
  @Input('notification') notification!: Notification;
  @Input('currentUserID') currentUserID!: string;
  constructor(
    private router: Router,
    private userNotificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  navigateNotification(): void {
    if (this.notification.id && this.currentUserID) {
      this.userNotificationService.setSeenNotification(
        this.currentUserID,
        this.notification.id
      );
      if (this.notification.type === 'message')
        this.router.navigate(['/messages/message', this.notification.byUser.id]);
      else
        this.router.navigate(['/friends'], {
          queryParams: { tab: 'request' },
          queryParamsHandling: 'merge',
        });
    }
  }
}
