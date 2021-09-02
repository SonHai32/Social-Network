import { NotificationService } from '../../services/notification.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getUserSelector } from '../../store/auth/auth.selectors';
import { User } from '../../models/user.model';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
  ) {}

  currentUser$!: User | null;

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
  subscription: Subscription = new Subscription();
  notificationSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(getUserSelector).subscribe((user) => {
        this.currentUser$ = user;
      })
    );
  }
}
