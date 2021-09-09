import { Store } from '@ngrx/store';
import { map, tap, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private afs: AngularFirestore,
    private notification: NzNotificationService,
    private store: Store
  ) {}
  addNotification(userID: string, notification: Notification) {
    return this.afs
      .doc<User>(`users/${userID}`)
      .collection<Notification>('notifications')
      .add(notification);
  }

  getNotification(userID: string): Observable<Notification[]> {
    return this.afs
      .doc<User>(`users/${userID}`)
      .collection<Notification>('notifications', (ref) =>
        ref.orderBy('created_at', 'desc')
      )
      .snapshotChanges()
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

  getUnseenNotification(userID: string): Observable<Notification[]> {
    return this.afs
      .doc<User>(`users/${userID}`)
      .collection<Notification>('notifications', (ref) =>
        ref.where('seen', '!=', true)
      )
      .snapshotChanges()
      .pipe(
        map((res) =>
          res.map((val) => {
            return {
              ...val.payload.doc.data(),
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
