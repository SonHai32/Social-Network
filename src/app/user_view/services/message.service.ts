import { map } from 'rxjs/operators';
import { Message } from './../models/message.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private afs: AngularFirestore) {}

  sendMessage(
    fromUserID: string,
    toUserID: string,
    message: Message
  ): Promise<[DocumentReference, DocumentReference]> {
    return Promise.all([
      this.saveMessage(fromUserID, toUserID, message),
      this.saveMessage(toUserID, fromUserID, message),
    ]);
  }

  saveMessage(fromuserID: string, toUserID: string, message: Message) {
    return this.afs
      .doc<User>(`users/${fromuserID}`)
      .collection('messages')
      .doc(toUserID)
      .collection<Message>('message_content')
      .add(message);
  }
  getMessage(fromUserID: string, toUserID: string) : Observable<Message[]>{
    return this.afs
      .doc<User>(`users/${fromUserID}`)
      .collection('messages')
      .doc(toUserID)
      .collection<Message>('message_content', ref => ref.orderBy('created_at', 'asc'))
      .snapshotChanges(['added', 'removed'])
      .pipe(
        map((res) =>
          res.map((message) => {
            return {
              ...message.payload.doc.data(),
              id: message.payload.doc.id,
            } as Message;
          })
        )
      );
  }
}
