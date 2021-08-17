import { AppMessageAction } from './../store/app-message/app-message.actions';
import { Store } from '@ngrx/store';
import { User } from 'src/app/user_view/models/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, mergeMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { Observable, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  sendFriendRequest(currentUser: User, friend: User): void {
    Promise.all([
      this.addToFriendRequest(friend.id, currentUser),
      this.addToRequestedList(currentUser.id, friend),
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

  getTotalFriends(currentUserID: string) :Observable<number>{
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

  constructor(private afs: AngularFirestore, private store: Store) {}
}
