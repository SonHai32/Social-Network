import { AppMessageAction } from '../../../store/app-message/app-message.actions';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-pane-menu',
  templateUrl: './pane-menu.component.html',
  styleUrls: ['./pane-menu.component.scss'],
})
export class PaneMenuComponent implements OnInit {
  @Input('currentUser') currentUser$!: User;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {}

  linkToUser(): void {
    if (this.currentUser$) {
      this.router.navigate(['/user', this.currentUser$.id]);
    } else {
      this.store.dispatch(
        AppMessageAction.SetAppMessage({
          message: 'Bạn chưa đăng nhập',
          message_type: 'warning',
        })
      );
    }
  }
}
