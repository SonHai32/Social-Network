import { NotificationService } from './notification.service';
import { UserStatus } from '../types/user-status.type';
import { AppMessageAction } from '../store/app-message/app-message.actions';
import { Store } from '@ngrx/store';
import { User } from 'src/app/social-network/models/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { Observable, combineLatest, from } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  sendFriendRequest(currentUser: User, friend: User): void {
    Promise.all([
      this.addToFriendRequest(friend.id, currentUser),
      this.addToRequestedList(currentUser.id, friend),
      this.notificationService.addNotification(friend.id, {
        byUser: currentUser,
        created_at: firebase.firestore.Timestamp.now(),
        seen: false,
        title: 'Đã gừi cho bạn lời mời kết bạn',
        type: 'friend_request',
      }),
    ])
      .then(() =>
        this.store.dispatch(
          AppMessageAction.SetAppMessage({
            message: 'Đã gửi lời mời kết bạn',
            message_type: 'success',
          })
        )
      )
      .catch((err) =>
        this.store.dispatch(
          AppMessageAction.SetAppMessage({
            message: err,
            message_type: 'error',
          })
        )
      );
  }

  addToRequestedList(userID: string, friend: User) {
    return this.afs
      .doc<User>(`users/${userID}`)
      .collection<User>('requested_list')
      .doc(friend.id)
      .set(friend);
  }

  addToFriendRequest(userID: string, friend: User) {
    return this.afs
      .doc<User>(`users/${userID}`)
      .collection<User>('friend_requests')
      .doc(friend.id)
      .set(friend);
  }

  addToFriendList(userID: string, friend: User): Promise<void> {
    return this.afs
      .doc<User>(`users/${userID}`)
      .collection<User>('friend_list')
      .doc(friend.id)
      .set(friend);
  }

  removeFriendRequest(userID: string, friendID: string): Promise<void> {
    return this.afs
      .doc<User>(`users/${userID}`)
      .collection<User>('friend_requests')
      .doc(friendID)
      .delete();
  }

  friendAccept(currentUser: User, friend: User): void {
    Promise.all([
      this.addToFriendList(currentUser.id, friend),
      this.addToFriendList(friend.id, currentUser),
      this.removeFriendRequest(currentUser.id, friend.id),
    ])
      .then(() =>
        this.store.dispatch(
          AppMessageAction.SetAppMessage({
            message: 'Đã đồng ý kết bạn',
            message_type: 'success',
          })
        )
      )
      .catch((err) =>
        this.store.dispatch(
          AppMessageAction.SetAppMessage({
            message: err,
            message_type: 'error',
          })
        )
      );
  }

  getFriendRequest(userID: string) {
    return this.afs
      .doc<User>(`users/${userID}`)
      .collection<User>('friend_requests')
      .snapshotChanges(['added', 'removed'])
      .pipe(
        map((resUser) =>
          resUser.map((user) => {
            return {
              ...(user.payload.doc.data() as User),
            };
          })
        )
      );
  }

  getUserInfo(userID: string) {
    return this.afs
      .doc<User>(`users/${userID}`)
      .get()
      .pipe(
        map((res) => {
          return { ...res.data(), id: res.id } as User;
        })
      );
  }

  searchUser(key: string) {
    return this.afs
      .collection<User>('users')
      .valueChanges()
      .pipe(
        map((res) =>
          res.filter(
            (val: User) => val.display_name.toLowerCase().indexOf(key.toLowerCase()) >= 0
          )
        )
      );
  }

  getFriendSuggestions(currentUserID: string) {
    return combineLatest([
      this.getFriendListID(currentUserID),
      this.getFriendRequestListID(currentUserID),
      this.afs
        .collection<User>('users', (ref) =>
          ref.where(
            firebase.firestore.FieldPath.documentId(),
            '!=',
            currentUserID
          )
        )
        .snapshotChanges(['added', 'removed'])
        .pipe(
          map((res) =>
            res.map((res) => {
              return {
                ...res.payload.doc.data(),
                id: res.payload.doc.id,
              } as User;
            })
          )
        ),
    ]).pipe(
      map((res) =>
        res[2].filter((user) => {
          return ![...res[0], ...res[1]].includes(user.id);
        })
      )
    );
  }

  getFriendListID(currentUserID: string): Observable<string[]> {
    return this.afs
      .doc<User>(`users/${currentUserID}`)
      .collection('friend_list')
      .snapshotChanges(['added', 'removed'])
      .pipe(
        map((res) =>
          res.map((user) => {
            return user.payload.doc.id;
          })
        )
      );
  }
  getFriendRequestListID(currentUserID: string) {
    return this.afs
      .doc<User>(`users/${currentUserID}`)
      .collection('requested_list')
      .snapshotChanges(['added', 'removed'])
      .pipe(
        map((res) =>
          res.map((user) => {
            return user.payload.doc.id;
          })
        )
      );
  }

  getAllFriend(currentUserID: string): Observable<User[]> {
    return this.afs
      .doc<User>(`users/${currentUserID}`)
      .collection<User>('friend_list')
      .snapshotChanges(['added', 'removed'])
      .pipe(
        map((res) =>
          res.map((user) => {
            return {
              ...user.payload.doc.data(),
              id: user.payload.doc.id,
            } as User;
          })
        )
      );
  }

  getTotalFriends(currentUserID: string): Observable<number> {
    return this.afs
      .doc<User>(`users/${currentUserID}`)
      .collection<User>('friend_list')
      .snapshotChanges(['added', 'removed'])
      .pipe(map((res) => res.length));
  }

  isFriendExisted(
    currentUserID: string,
    friendID: string
  ): Observable<boolean> {
    return this.afs
      .doc<User>(`users/${currentUserID}`)
      .collection<User>('friend_list')
      .doc(friendID)
      .get()
      .pipe(map((res) => res.exists));
  }

  addNewUser(user: User): Promise<void> {
    return this.afs.collection<User>('users').doc(user.id).set(user);
  }
  updateUserData(user: User): Promise<void> {
    return this.afs.collection<User>('users').doc<User>(user.id).update(user);
  }
  updateOnConnect(userID: string) {
    return this.afdb
      .object('.info/connected')
      .snapshotChanges()
      .pipe(
        map((connection) => (connection ? 'online' : 'offline')),
        tap((state) => this.setUserStatus(userID, state))
      );
  }

  setUserStatus(userID: string, state: 'online' | 'offline') {
    return this.afdb.object(`status/${userID}`).set({
      state,
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    });
  }

  updateOnDisconnect(userID: string) {
    return from(
      this.afdb.object(`status/${userID}`).query.ref.onDisconnect().set({
        state: 'offline',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      })
    );
  }

  getUserPresence(userID: string): Observable<UserStatus> {
    return this.afdb
      .object<UserStatus>(`status/${userID}`)
      .snapshotChanges()
      .pipe(
        map((snap) => snap.payload.val()),
        map((status) => {
          if (status) {
            return status;
          } else {
            return {
              state: 'offline',
              last_change: firebase.database.ServerValue.TIMESTAMP,
            } as UserStatus;
          }
        })
      );
  }
  constructor(
    private afs: AngularFirestore,
    private store: Store,
    private afdb: AngularFireDatabase,
    private notificationService: NotificationService
  ) {}
}
