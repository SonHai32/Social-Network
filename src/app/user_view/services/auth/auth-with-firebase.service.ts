import { UserCredentials } from './../../models/user-credentials.model';
import { User } from './../../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthWithFirebaseService {
  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {}
  async loginWithEmailAndPassword(user: UserCredentials): Promise<any | null> {
    const res = await this.auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
    if (res.user) {
      return { email: res.user.email, id: res.user.uid };
    } else {
      return null;
    }
  }

  createuserwithemailandpassword(
    userCredentials: UserCredentials
  ): Observable<User> {
    return new Observable<User>((observable) => {
      this.auth
        .createUserWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        )
        .then((res) => {
          if (res.user) {
            const userCreated: User = {
              id: res.user.uid,
              display_name: userCredentials.display_name,
              email: userCredentials.email,
              created_at: firebase.firestore.Timestamp.now(),
              avatar_url: `https://ui-avatars.com/api/?name=${userCredentials.display_name}&length=1`,
            };
            res.user
              .updateProfile({
                displayName: userCreated.display_name,
                photoURL: userCreated.avatar_url,
              })
              .then(() => {
                this.afs
                  .collection<User>('users')
                  .add(userCreated)
                  .then((saveUser) => {
                    if (saveUser) {
                      observable.next(userCreated);
                      observable.complete();
                    }
                  });
              });
          }
        })
        .catch((err) => {
          observable.error(
            new Error('Tạo tài khoản thất bại, vui lòng kiểm tra email !')
          );
        });
    });
  }
}
