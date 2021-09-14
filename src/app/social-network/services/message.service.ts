import { NzImage } from 'ng-zorro-antd/image';
import { StorageService } from './storage.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { PrivateMessage } from './../models/message.model';
import { NotificationService } from './notification.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private afs: AngularFirestore,
    private notificationService: NotificationService,
    private storageService: StorageService
  ) {}

  getMessageList(currentUserID: string): Observable<string[]> {
    return this.afs
      .doc<User>(`users/${currentUserID}`)
      .collection('messages', (ref) => ref.orderBy('created_at', 'desc'))
      .snapshotChanges(['added', 'removed'])
      .pipe(map((res) => res.map((val) => val.payload.doc.id)));
  }

  getLastedMessage(fromUserID: string, toUserID: string): Observable<string> {
    return this.afs
      .doc<User>(`users/${fromUserID}`)
      .collection('messages')
      .doc(toUserID)
      .collection<PrivateMessage>('message_content', (ref) =>
        ref.orderBy('created_at', 'desc').limit(1)
      )
      .snapshotChanges()
      .pipe(
        map((res) =>
          res.map((val) => {
            const message = val.payload.doc.data().textMessage;
            if (val.payload.doc.data().sendByID === fromUserID) {
              return 'Bạn: ' + (message ? message : 'Hình ảnh');
            }
            return message ? message : 'Hình ảnh';
          })
        ),
        map((res) =>
          res[res.length - 1]
            ? res[res.length - 1].toString()
            : 'Chưa có tin nhắn '
        )
      );
  }

  sendMessage(
    fromUser: User,
    toUserID: string,
    message: PrivateMessage,
    imageList?: NzUploadFile[] | undefined
  ): Promise<string> {
    return new Promise<string>((reslove, reject) => {
      if (imageList && imageList.length > 0) {
        this.storageService
          .fileUpload(imageList, fromUser.id + toUserID)
          .pipe(
            map((res: string[]) =>
              res.map((val: string) => {
                return {
                  src: val,
                  alt: 'image_from_user_private_message',
                } as NzImage;
              })
            ),
          )
          .subscribe((imageList: NzImage[]) => {
            Promise.all([
              this.saveMessage(fromUser.id, toUserID, {
                ...message,
                imageMessage: imageList,
              }),
              this.saveMessage(toUserID, fromUser.id, {
                ...message,
                imageMessage: imageList,
              }),
              this.notificationService.addNotification(toUserID, {
                byUser: fromUser,
                created_at: firebase.firestore.Timestamp.now(),
                seen: false,
                title: 'Đã gửi tin nhắn cho bạn',
                type: 'message',
              }),
            ])
              .then(() => reslove('SUCCESS'))
              .catch((err) => reject(err));
          });
      } else {
        Promise.all([
          this.saveMessage(fromUser.id, toUserID, message),
          this.saveMessage(toUserID, fromUser.id, message),
          this.notificationService.addNotification(toUserID, {
            byUser: fromUser,
            created_at: firebase.firestore.Timestamp.now(),
            seen: false,
            title: 'Đã gửi tin nhắn cho bạn',
            type: 'message',
          }),
        ])
          .then(() => reslove('SUCCESS'))
          .catch((err) => reject(err));
      }
    });
  }

  saveMessage(fromuserID: string, toUserID: string, message: PrivateMessage) {
    this.afs
      .doc<User>(`users/${fromuserID}`)
      .collection('messages')
      .doc(toUserID)
      .set({
        id: fromuserID + toUserID,
        created_at: firebase.firestore.Timestamp.now(),
      });
    return this.afs
      .doc<User>(`users/${fromuserID}`)
      .collection('messages')
      .doc(toUserID)
      .collection<PrivateMessage>('message_content')
      .add(message);
  }
  getMessage(
    fromUserID: string,
    toUserID: string
  ): Observable<PrivateMessage[]> {
    this.notificationService
      .setSeenMessageNotification(fromUserID, toUserID)
    return this.afs
      .doc<User>(`users/${fromUserID}`)
      .collection('messages')
      .doc(toUserID)
      .collection<PrivateMessage>('message_content', (ref) =>
        ref.orderBy('created_at', 'asc')
      )
      .snapshotChanges(['added', 'removed'])
      .pipe(
        map((res) =>
          res.map((message) => {
            return {
              ...message.payload.doc.data(),
              id: message.payload.doc.id,
            } as PrivateMessage;
          })
        )
      );
  }
}
