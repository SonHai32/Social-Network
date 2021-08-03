import { CommentService } from './../../../services/comment.service';
import { PostComment } from './../../../models/comment.model';
import { AppMessageAction } from './../../../store/app-message/app-message.actions';
import { PostsService } from './../../../services/posts.service';
import { PostsActions } from './../../../store/posts/posts.actions';
import { getUserSelector } from './../../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Post } from './../../../models/post.model';
import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { User } from 'src/app/user_view/models/user.model';
import firebase from 'firebase/app';
import { PostSelectors } from 'src/app/user_view/store/posts/posts.selectors';

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
    private postService: PostsService,
    private commentService: CommentService
  ) {}

  childCommentVisible: boolean = false;
  comments!: Observable<PostComment[]>;
  totalComment!: Observable<number>;
  totalLike!: Observable<number>;
  replyCommentDisplayIndex: number[] = [];
  postLikeBy!: Observable<string[]>;
  isLiked!: Observable<boolean>;
  subscription: Subscription = new Subscription();
  commentListVisible: boolean = false;
  isCommentUploading!: Observable<boolean>;
  ngOnInit(): void {
    this.isCommentUploading = this.store.select(
      PostSelectors.getPostCommentUploading
    );
    if (this.post.id) {
      this.totalComment = this.commentService.getCommentCount(this.post.id);
      this.totalLike = this.postService.getPostLike(this.post.id);
    }
    this.subscription.add(
      this.store.select(getUserSelector).subscribe((user) => {
        if (this.post.id && user) {
          this.isLiked = this.postService.isUserLiked(this.post.id, user.id);
        }
      })
    );
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

  postComment(
    commentText: string,
    isChild: boolean,
    el: HTMLElement,
    commentID?: string
  ) {
    if (commentText.trim() === '') {
      return;
    }
    if (this.post.id && this.user?.id && this.user.display_name) {
      const comment: PostComment = {
        commentText: commentText,
        created_at: firebase.firestore.Timestamp.now(),
        created_by_id: this.user?.id,
        avatar_url: this.user.avatar_url,
        created_by_display_name: this.user.display_name,
        postID: this.post.id,
        child_comments: [],
      };
      if (!isChild) {
        this.store.dispatch(
          PostsActions.PostCommentUpload({ comment, isChild })
        );
      } else {
        this.store.dispatch(
          PostsActions.PostCommentUpload({ comment, isChild, commentID })
        );
      }
      this.isCommentUploading.subscribe((val) => {
        setTimeout(() => {
          (el as HTMLTextAreaElement).value = '';
          (el as HTMLTextAreaElement).blur();
          this.replyCommentDisplayIndex = [];
      //  (this.commentContainerRef.scrollIntoView({ block: 'center'}));
        }, 100);
        if (!this.commentListVisible) {
          this.toggleListComment();
        }
      });
    }
  }

  toggleListComment(): void {
    if (this.commentListVisible) {
      this.commentListVisible = false;
    } else {
      this.commentListVisible = true;
      if (this.post.id) {
        this.comments = this.commentService.getAllComment(this.post.id);
      }
    }
  }

  toggleChildComment(commentIndex: number) {
    if (this.replyCommentDisplayIndex.includes(commentIndex)) {
      this.replyCommentDisplayIndex = this.replyCommentDisplayIndex.filter(
        (val: number) => val !== commentIndex
      );
    } else {
      this.replyCommentDisplayIndex.push(commentIndex);
    }
  }

}
