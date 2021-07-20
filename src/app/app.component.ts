import { NzMessageService } from 'ng-zorro-antd/message';
import { ErrorSelector } from './user_view/store/error/error.selectors';
import { ErrorState } from './user_view/store/error/error.state';
import { Observable } from 'rxjs';
import { AppState } from './user_view/store/app.state';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Covid-Social-Network';

  $error!: Observable<ErrorState>;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.$error.subscribe((val: ErrorState) => {
      if (val.hasError) {
        this.messageService.error(val.errorMessage);
      }
    });

  }
  constructor(
    private readonly store: Store<AppState>,
    private readonly messageService: NzMessageService,
  ) {
    this.$error = this.store.select(ErrorSelector.getErrorSelector);
  }
}
