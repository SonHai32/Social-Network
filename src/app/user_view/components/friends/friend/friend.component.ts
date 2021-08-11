import { ActivatedRoute, Router } from '@angular/router';
import { getUserSelector } from 'src/app/user_view/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/user_view/models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class FriendComponent implements OnInit {
  currentUser!: Observable<User | null>;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.store.select(getUserSelector);
    this.route.queryParamMap.subscribe((qps) => {
      if (!qps.get('tab')) {
        this.router.navigate([], {
          queryParams: { tab: 'all' },
          queryParamsHandling: 'merge',
        });
      }
    });
  }
}
