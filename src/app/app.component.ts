import { getAppLoadingSelector } from './user_view/store/app-loading/loading.selectors';
import { AuthActions } from './user_view/store/auth/auth.action';
import { AuthWithFirebaseService } from './user_view/services/auth-with-firebase.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppMessageState } from './user_view/store/app-message/app-message.state';
import { Observable, Subscription } from 'rxjs';
import { AppState } from './user_view/store/app.state';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { getAppMessageSelector } from './user_view/store/app-message/app-message.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Covid-Social-Network';
  subscription: Subscription = new Subscription();
  $error!: Observable<AppMessageState>;
  $isLoading!: boolean;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscription.add(
      this.$error.subscribe((val: AppMessageState) => {
        if (val.has_message) {
          this.messageService.create(val.message_type, val.message)
        }
      })
    );

    this.subscription.add(
      this.store
        .select(getAppLoadingSelector)
        .subscribe((isLoading: boolean) => (this.$isLoading = isLoading))
    );
    this.store.dispatch(AuthActions.CheckAuth());
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
  constructor(
    private readonly store: Store<AppState>,
    private readonly messageService: NzMessageService
  ) {
    this.$error = this.store.select(getAppMessageSelector);
  }
}
