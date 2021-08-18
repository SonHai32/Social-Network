import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Notification } from './../models/notification.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private afs: AngularFirestore) {}
  addNotification(
    userID: string,
    notification: Notification
  ): Promise<DocumentReference> {
    return this.afs
      .doc<User>(`users/${userID}`)
      .collection<Notification>('notifications')
      .add(notification);
  }

  getNotification(userID: string): Observable<Notification[]> {
    return this.afs
      .doc<User>(`users/${userID}`)
      .collection<Notification>('notifications')
      .snapshotChanges(['added'])
      .pipe(
        map((snap) =>
          snap.map((notification) => {
            return {
              ...notification.payload.doc.data(),
              id: notification.payload.doc.id,
            } as Notification;
          })
        )
      );
  }

  setSeenNotification(userID: string, notificationID: string): Promise<void> {
    return this.afs
      .doc<User>(`users/${userID}`)
      .collection('notifications')
      .doc<Notification>(notificationID)
      .update({ seen: true });
  }
}
