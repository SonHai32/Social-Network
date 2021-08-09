import { User } from 'src/app/user_view/models/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  sendFriendRequest(currentUser: User, userID: string) {
    this.afs
      .doc<User>(`users/${userID}`)
      .collection<User>('friend_requests')
      .add(currentUser);
  }

  getFriendRequest(userID: string) {
    return this.afs
      .doc<User>(`users/${userID}`)
      .collection<User>('friend_requests', (ref) => ref.limit(2))
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

  constructor(private afs: AngularFirestore) {}
}
