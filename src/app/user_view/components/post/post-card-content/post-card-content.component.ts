import { AppMessageAction } from './../../../store/app-message/app-message.actions';
import { PostsService } from './../../../services/post/posts/posts.service';
import { PostsActions } from './../../../store/posts/posts.actions';
import { getUserSelector } from './../../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Subscription, Observable, observable } from 'rxjs';
import { Post } from './../../../models/post.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { User } from 'src/app/user_view/models/user.model';
@Component({
  selector: 'home-post-card-content',
  templateUrl: './post-card-content.component.html',
  styleUrls: ['./post-card-content.component.scss'],
})
export class PostCardContentComponent implements OnInit {
  @Input('post') post!: Post;
  @Input('user') user!: User | null | undefined;
  constructor(
    private store: Store,
    private imageService: NzImageService,
    private postService: PostsService
  ) {}
  commentInputValue: string = '';
  postLikeBy!: Observable<string[]>;
  isLiked!: Observable<boolean>;

  subscription: Subscription = new Subscription();
  ngOnInit(): void {
    this.subscription.add(
      this.store.select(getUserSelector).subscribe((user) => {
        if (this.post.id && user) {
          this.isLiked = this.postService.isUserLiked(this.post.id, user.id);
        }
      })
    );
  }
  addEmoji(event: any) {
    const { emoji } = event;
    this.commentInputValue += emoji.native;
  }

  previewListImage() {
    if (this.post.post_content.image_content) {
      this.imageService.preview(this.post.post_content.image_content);
    }
  }

  postLikeUpdate(postID: string | undefined) {
    if (postID && this.user) {
      this.subscription.add(
        this.store.dispatch(
          PostsActions.PostLike({ postID, userID: this.user.id })
        )
      );
    } else {
      this.subscription.add(
        this.store.dispatch(
          AppMessageAction.SetAppMessage({
            message: 'Bạn chưa đăng nhập',
            message_type: 'error',
          })
        )
      );
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
