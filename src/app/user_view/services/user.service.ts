import { User } from 'src/app/user_view/models/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUserOffer(userID: string) {
    return this.afs
      .collection<User>('users', (ref) =>
        ref
          .limit(2)
          .where(firebase.firestore.FieldPath.documentId(), '!=', userID)
      )
      .snapshotChanges(['added', 'removed'])
      .pipe(
        map((user) => {
          return user.map((val) => {
            return {
              ...val.payload.doc.data(),
              id: val.payload.doc.id,
            };
          });
        })
      );
  }

  sendFriendRequest(currentUser: User, userID: string) {
    this.afs
      .doc<User>(`users/${userID}`).get().subscribe((resUser) =>{
          const friendRequests = resUser.data()?.friend_requests
          if(friendRequests){
            resUser.ref.update({friend_requests: [...friendRequests, currentUser]})
          }else{
            resUser.ref.update({friend_requests: [currentUser]})
          }
      })
  }

  getFriendRequest(userID: string){
    return this.afs.doc<User>(`users/9dLWdhQwFn0N86pNJ2AZ`).snapshotChanges().pipe(
      map(resUser =>{
        console.log(resUser);
        return  resUser.payload.data()?.friend_requests
      })
    )
  }

  constructor(private afs: AngularFirestore) {}
}
