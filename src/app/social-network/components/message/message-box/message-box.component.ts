import { NzUploadFile, UploadFilter } from 'ng-zorro-antd/upload';
import { UserService } from 'src/app/social-network/services/user.service';
import { tap, map } from 'rxjs/operators';
import { AppMessageAction } from '../../../store/app-message/app-message.actions';
import { ActivatedRoute } from '@angular/router';
import { PrivateMessage } from '../../../models/message.model';
import { getUserSelector } from 'src/app/social-network/store/auth/auth.selectors';
import { Observable, Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import { MessageService } from '../../../services/message.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/user.model';
import { Store } from '@ngrx/store';
import firebase from 'firebase/app';
import { getBase64 } from 'src/app/social-network/utils/getBase64';
import { merge, keyBy, values } from 'lodash';
import * as _ from 'lodash';

interface imageDisplayBase64 {
  url: string | ArrayBuffer | null;
  originalIndex: number;
}
@Component({
  selector: 'app-message',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit {
  @ViewChild('messageContainer', { static: true })
  public messageContainerRef!: CdkVirtualScrollViewport;
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private store: Store,
    private userService: UserService
  ) {}
  chatBoxValue: string = '';
  currentUser$!: User;
  friend!: User;
  messages$!: Observable<PrivateMessage[]>;
  subscription: Subscription = new Subscription();
  imageList: NzUploadFile[] = [];
  nzFileUploadSubject = new BehaviorSubject<NzUploadFile[]>([]);
  imageBase64List!: Observable<imageDisplayBase64[]>;
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.nzFileUploadSubject.asObservable().subscribe((val) => {
        console.log(val);
        this.setImageBase64();
      })
    );
    this.route.paramMap.subscribe((params) => {
      const ID: string | null = params.get('id');
      if (ID) {
        this.subscription.add(
          this.userService.getUserInfo(ID).subscribe((user: User) => {
            this.friend = user;
          })
        );
        this.subscription.add(
          this.store.select(getUserSelector).subscribe((user) => {
            if (user) {
              this.messages$ = this.messageService
                .getMessage(user.id, ID)
                .pipe(tap(() => this.scrollToBottom()));
              this.currentUser$ = user;
            }
          })
        );
      }
    });
  }

  isDisplayTime(messageTime: Date): boolean {
    return (Date.now() - messageTime.getTime()) / 3600000 > 1;
  }
  sendMessage() {
    //has text
    if (
      this.chatBoxValue?.trim() ||
      (this,
      this.nzFileUploadSubject.value &&
        this.nzFileUploadSubject.value.length > 0)
    ) {
      if (this.currentUser$ && this.friend) {
        const message: PrivateMessage = {
          sendByID: this.currentUser$.id,
          created_at: firebase.firestore.Timestamp.now(),
          textMessage: this.chatBoxValue,
        };
        this.messageService
          .sendMessage(
            this.currentUser$,
            this.friend.id,
            message,
            this.nzFileUploadSubject.value
          )
          .catch((err) =>
            this.store.dispatch(
              AppMessageAction.SetAppMessage({
                message: err,
                message_type: 'error',
              })
            )
          );
        this.chatBoxValue = '';
        this.nzFileUploadSubject.next([]);
      }
    }
  }

  test() {
    console.log('test');
  }
  // Hook function which will be executed before uploading.
  //Uploading will be stopped with false or a Observable.
  //Warning：this function is not supported in IE9. NOTICE:
  //Must use => to define the method.
  //https://ng.ant.design/version/11.4.x/components/upload/en#api
  //Khuyen khich su dung arrow fn
  beforeUpload = (
    nzFile: NzUploadFile,
    nzFileList: NzUploadFile[]
  ): boolean => {
    this.imageList = this.imageList.concat(nzFile);
    const fileMergeWithoutDuplicated = values(
      merge(
        keyBy(nzFileList, 'uid'),
        keyBy(this.nzFileUploadSubject.value, 'uid')
      )
    );
    if (
      !_.isEqual(fileMergeWithoutDuplicated, this.nzFileUploadSubject.value)
    ) {
      this.nzFileUploadSubject.next(
        values(
          merge(
            keyBy(nzFileList, 'uid'),
            keyBy(this.nzFileUploadSubject.value, 'uid')
          )
        )
      );
    }

    return false;
  };

  setImageBase64() {
    this.imageBase64List = combineLatest([
      ...this.nzFileUploadSubject.value.map((file, index) =>
        getBase64(file as any).pipe(
          map((res) => {
            return {
              url: res,
              originalIndex: index,
            };
          })
        )
      ),
    ]);
  }
  imageUploadRemove(originalIndex: number) {
    try {
      this.nzFileUploadSubject.next(
        this.nzFileUploadSubject.value.filter(
          (val, index) => index !== originalIndex
        )
      );
    } catch (error) {
      this.store.dispatch(
        AppMessageAction.SetAppMessage({
          message: 'Có lỗi xảy ra vui lòng thử lại !',
          message_type: 'error',
        })
      );
    }
  }
  scrollToBottom() {
    setTimeout(
      () =>
        this.messageContainerRef.scrollTo({
          bottom: 0,
          behavior: 'auto',
        }),
      0
    );
  }

  trackByImageUploadBase64(index: number, item: imageDisplayBase64) {
    console.log(item);
    return index;
  }
}
