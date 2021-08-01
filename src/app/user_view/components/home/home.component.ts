import { getUserSelector } from './../../store/auth/auth.selectors';
import { User } from './../../models/user.model';
import { AppState } from './../../store/app.state';
import { GetAllPost, GetAllPostSuccess, PostsActions } from './../../store/posts/posts.actions';
import {
  getPostLoading,
  PostSelectors,
} from './../../store/posts/posts.selectors';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from './../../models/post.model';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { vmFromLatest } from '../../utils/operators';
import { getPostsSelector } from '../../store/posts/posts.selectors';
interface PostListVm {
  posts: Post[];
  isLoading: boolean;
  currentUser?: User | null;
  totalPost: number;
  limit: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  totalPost!: Observable<number>;

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
  subscription: Subscription = new Subscription();

  vm$!: Observable<PostListVm>;
  ngOnInit(): void {
    this.subscription.add(this.store.dispatch(GetAllPost({ limit: 5 })));
    this.subscription.add(this.store.dispatch(PostsActions.GetTotalPost()));
    this.vm$ = vmFromLatest<PostListVm>({
      posts: this.store.pipe(select(getPostsSelector)),
      isLoading: this.store.pipe(select(getPostLoading)),
      currentUser: this.store.pipe(select(getUserSelector)),
      totalPost: this.store.pipe(select(PostSelectors.getTotalPost)),
      limit: this.store.pipe(select(PostSelectors.getPostLimit)),
    });
  }

  scrollHandle(position: any) {
    if (position === 'bottom') {
      this.vm$
        .subscribe((postVM: PostListVm) => {
          if (postVM.limit < postVM.totalPost) {
            this.store.dispatch(
              PostsActions.GetAllPost({ limit: postVM.limit + 5 })
            );
          }
        })
        .unsubscribe();
    }
  }
}
