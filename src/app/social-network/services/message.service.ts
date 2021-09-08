import { PrivateMessage } from './../models/message.model';
import { NotificationService } from './notification.service';
import { map } from 'rxjs/operators';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private afs: AngularFirestore,
    private notificationService: NotificationService
  ) {}

  getMessageList(currentUserID: string): Observable<string[]> {
    return this.afs
      .doc<User>(`users/${currentUserID}`)
      .collection('messages')
      .stateChanges(['added', 'removed'])
      .pipe(map((res) => [...res.length.toString()]));

  }

  sendMessage(
    fromUser: User,
    toUserID: string,
    message: PrivateMessage
  ): Promise<[DocumentReference, DocumentReference, DocumentReference]> {
    return Promise.all([
      this.saveMessage(fromUser.id, toUserID, message),
      this.saveMessage(toUserID, fromUser.id, message),
      this.notificationService.addNotification(toUserID, {
        byUser: fromUser,
        created_at: firebase.firestore.Timestamp.now(),
        seen: false,
        title: 'Đã gửi tin nhắn cho bạn',
        type: 'message',
      }),
    ]);
  }

  saveMessage(fromuserID: string, toUserID: string, message: PrivateMessage) {
    return this.afs
      .doc<User>(`users/${fromuserID}`)
      .collection('messages')
      .doc(toUserID)
      .collection<PrivateMessage>('message_content')
      .add(message);
  }
  getMessage(fromUserID: string, toUserID: string): Observable<PrivateMessage[]> {
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
