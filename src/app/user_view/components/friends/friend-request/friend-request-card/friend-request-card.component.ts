import { Component, OnInit } from '@angular/core';
import {
  bounceInOnEnterAnimation,
} from 'angular-animations';
@Component({
  selector: 'friend-request-card',
  templateUrl: './friend-request-card.component.html',
  styleUrls: ['./friend-request-card.component.scss'],
  animations: [
    bounceInOnEnterAnimation({anchor: 'enter'}),
  ],
})
export class FriendRequestCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
