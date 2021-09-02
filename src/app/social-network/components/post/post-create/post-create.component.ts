import { status } from '../../../models/status.model';
import { PostSelectors } from '../../../store/posts/posts.selectors';
import { PostsActions } from '../../../store/posts/posts.actions';
import { NzImage } from 'ng-zorro-antd/image';
import { Post } from '../../../models/post.model';
import { Subscription, Observable } from 'rxjs';
import { getUserSelector } from '../../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { User } from '../../../models/user.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import firebase from 'firebase/app';

@Component({
  selector: 'home-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  @Output() closeCreatePostModal = new EventEmitter();
  @ViewChild('inputTag', { static: false }) inputTagRef?: ElementRef;
  @ViewChild('postContentInput', { static: false })
  postContentInputRef?: ElementRef;
  inputTagVisible: boolean = false;
  addTagLabelVisible: boolean = false;
  tags: string[] = [];
  inputTagValue: string = '';
  imageFiles: NzUploadFile[] = [];
  imageListVisible: boolean = false;
  imageAsBase64!: NzImage[];
  textContent: string = '';
  currentUser!: User;
  subscription: Subscription = new Subscription();
  postUploading!: Observable<boolean>;

  constructor(private msg: NzMessageService, private store: Store) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(getUserSelector).subscribe((user: User | null) => {
        if (user) {
          this.currentUser = user;
        }
      })
    );

    this.subscription.add(
      this.store.dispatch(PostsActions.PostUploadStatus({ status: 'idle' }))
    );

    this.subscription.add(
      this.store
        .select(PostSelectors.getPostUploadStatus)
        .subscribe((status: status) => {
          if (status === 'success') {
            setTimeout(() => {
              this.closeCreatePostModal.emit();
            }, 800);
          }
        })
    );

    this.postUploading = this.store.select(PostSelectors.getPostUploading);
    this.subscription.add(this.postUploading.subscribe())
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  showInputTag() {
    this.inputTagVisible = true;

    setTimeout(() => {
      this.inputTagRef?.nativeElement.focus();
    }, 10);
  }

  submitTag(): void {
    if (
      this.inputTagValue &&
      this.tags.indexOf(this.inputTagValue) === -1 &&
      this.inputTagValid()
    ) {
      this.tags = [...this.tags, this.inputTagValue];
      this.affterTagSubmit();
    } else {
      this.affterTagSubmit();
    }
  }

  affterTagSubmit() {
    this.inputTagValue = '';
    this.inputTagVisible = false;
  }

  removeTag(removeTag: string) {
    this.tags = this.tags.filter((tag: string) => tag !== removeTag);

    setTimeout(() => {
      if (this.tags.length === 0) {
        this.addTagLabelVisible = false;
      }
    }, 10);
  }

  showTagLabel(): void {
    this.addTagLabelVisible = true;

    setTimeout(() => {
      if (this.tags.length === 0) {
        this.addTagLabelVisible = false;
      }
    }, 10000);
  }

  inputTagValid(): boolean {
    let isValid: boolean = true;
    if (this.inputTagValue.length > 15) {
      this.msg.error('Hashtag tối đa 15 kí tự');
      isValid = false;
    }

    return isValid;
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.imageFiles = this.imageFiles.concat(file);
    return false;
  };

  toggleShowListImage(): void {
    this.imageListVisible = !this.imageListVisible;
  }

  createPost(): void {
    if (this.currentUser) {
      const post: Post = {
        avatar_url: this.currentUser.avatar_url,
        create_by_username: this.currentUser.display_name,
        created_by_id: this.currentUser.id,
        created_at: firebase.firestore.Timestamp.now(),
        post_content: {
          text_content: this.textContent,
          hashtag: this.tags,
        },
      };
      if (this.imageFiles.length > 0) {
        this.store.dispatch(
          PostsActions.PostUpload({ post, imageList: this.imageFiles })
        );
      } else {
        this.store.dispatch(PostsActions.PostUpload({ post }));
      }
    }
  }
}
