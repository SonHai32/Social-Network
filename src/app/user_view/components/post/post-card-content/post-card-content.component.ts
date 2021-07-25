import { PostsActions } from './../../../store/posts/posts.actions';
import { getUserSelector } from './../../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from './../../../models/post.model';
import { Component, Input, OnInit } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { User } from 'src/app/user_view/models/user.model';
@Component({
  selector: 'home-post-card-content',
  templateUrl: './post-card-content.component.html',
  styleUrls: ['./post-card-content.component.scss'],
})
export class PostCardContentComponent implements OnInit {
  @Input('post') post!: Post;
  constructor(private store: Store, private imageService: NzImageService) {}
  commentInputValue: string = '';

  currentUser!: User;
  subscription: Subscription = new Subscription();
  ngOnInit(): void {
    this.subscription.add(
      this.store.select(getUserSelector).subscribe((user: User | null) => {
        if (user) {
          this.currentUser = user;
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
    if (postID && this.currentUser.id) {
      this.subscription.add(
        this.store.dispatch(
          PostsActions.PostLike({ postID, userID: this.currentUser.id })
        )
      );
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe()
  }
}
