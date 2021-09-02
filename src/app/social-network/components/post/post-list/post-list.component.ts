import { ActivatedRoute } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/social-network/models/post.model';
import { User } from 'src/app/social-network/models/user.model';
import { PostsService } from 'src/app/social-network/services/posts.service';
import { AppState } from 'src/app/social-network/store/app.state';
import { getUserSelector } from 'src/app/social-network/store/auth/auth.selectors';
import { PostsActions } from 'src/app/social-network/store/posts/posts.actions';
import {
  getPostLoading,
  getPostsSelector,
  PostSelectors,
} from 'src/app/social-network/store/posts/posts.selectors';
import { vmFromLatest } from 'src/app/social-network/utils/operators';

interface PostListVm {
  posts: Post[];
  isLoading: boolean;
  currentUser?: User | null;
  limit: number;
}
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  userID!: string | null;

  constructor(
    private store: Store<AppState>,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}

  totalPost!: number;
  postLimit!: number;

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
  subscription: Subscription = new Subscription();

  vm$!: Observable<PostListVm>;
  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      this.userID = params.get('id');
      if (this.userID) {
        this.getPost(this.userID);
      } else {
        this.getPost();
      }
    });

    this.subscription.add(
      this.postService.getTotalPost().subscribe((total: number) => {
        this.totalPost = total;
      })
    );
    this.subscription.add(
      this.store
        .select(PostSelectors.getPostLimit)
        .subscribe((limit: number) => {
          this.postLimit = limit;
        })
    );
    this.vm$ = vmFromLatest<PostListVm>({
      posts: this.store.pipe(select(getPostsSelector)),
      isLoading: this.store.pipe(select(getPostLoading)),
      currentUser: this.store.pipe(select(getUserSelector)),
      limit: this.store.pipe(select(PostSelectors.getPostLimit)),
    });
  }

  scrollHandle(position: any) {
    if (position === 'bottom') {
      if (this.postLimit < this.totalPost) {
        if (this.userID) {
          this.store.dispatch(
            PostsActions.GetAllPost({
              limit: this.postLimit + 5,
              userID: this.userID,
            })
          );
        } else {
          this.store.dispatch(
            PostsActions.GetAllPost({
              limit: this.postLimit + 5
            })
          );
        }
      }
    }
  }

  getPost(userID?: string) {
    this.subscription.add(
      this.store.dispatch(PostsActions.GetAllPost({ limit: 5, userID }))
    );
  }
}
