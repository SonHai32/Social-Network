import { User } from 'src/app/user_view/models/user.model';
import { tap } from 'rxjs/operators';
import { UserCredentials } from '../models/user-credentials.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import firebase from 'firebase/app';
import { UserFirestoreService } from './user-firestore.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/internal/operators/map';
@Injectable({
  providedIn: 'root',
})
export class AuthWithFirebaseService {
  constructor(
    private auth: AngularFireAuth,
    private userFirestore: UserFirestoreService,
    private afdb: AngularFireDatabase
  ) {}

  checkAuth(): Observable<User | null> {
    return this.auth.authState.pipe(
      map((user) => {
        if (user) {
          return {
            id: user.uid,
            avatar_url: user.photoURL,
            display_name: user.displayName,
            email: user.email,
          } as User;
        } else {
          return null;
        }
      }),
      tap((user) => {
        if (user) {
          this.updateOnConnect(user.id).subscribe();
          this.updateOnDisconnect(user.id).subscribe();
        }
      })
    );
  }

  updateOnConnect(userID: string) {
    return this.afdb
      .object('.info/connected')
      .snapshotChanges()
      .pipe(
        map((connection) => (connection ? 'online' : 'offline')),
        tap((state) => {
          this.afdb.object(`status/${userID}`).set({
            state,
            last_changed: firebase.database.ServerValue.TIMESTAMP,
          });
        })
      );
  }

  updateOnDisconnect(userID: string) {
    return from(
      this.afdb.object(`status/${userID}`).query.ref.onDisconnect().set({
        state: 'offline',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      })
    );
  }

  loginWithEmailAndPassword(
    userCredentials: UserCredentials
  ): Observable<User> {
    return new Observable<User>((observable) => {
      this.auth
        .signInWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        )
        .then((resUser: firebase.auth.UserCredential) => {
          if (resUser.user) {
            const currentUser: User = {
              id: resUser.user.uid,
              email: resUser.user.email,
              avatar_url: resUser.user.photoURL,
              display_name: resUser.user.displayName
                ? resUser.user.displayName
                : '',
            };

            observable.next(currentUser);
            observable.complete();
          }
        })
        .catch((error: firebase.FirebaseError) => {
          if (error.code === 'auth/user-not-found') {
            observable.error(new Error('Người dùng không tồn tại'));
          } else if (error.code === 'auth/wrong-password') {
            observable.error(
              new Error('Đăng nhập thất bại, mật khẩu không chính xác')
            );
          } else if (error.code === 'auth/too-many-requests') {
            observable.error(
              new Error(
                'Bạn đang cố truy cập tài khoản nhiều lần, vui lòng thử lại sau ít phút'
              )
            );
          } else {
            observable.error(error);
          }
        });
    });
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
              display_name: userCredentials.display_name
                ? userCredentials.display_name
                : '',
              email: userCredentials.email,
              created_at: firebase.firestore.Timestamp.now(),
              avatar_url: `https://ui-avatars.com/api/?name=${userCredentials.display_name}&length=2`,
            };
            res.user
              .updateProfile({
                displayName: userCreated.display_name,
                photoURL: userCreated.avatar_url,
              })
              .then(() => {
                this.userFirestore.addNewUser(userCreated).then(() => {
                  observable.next(userCreated);
                  observable.complete();
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

  signInWithPopup(
    popupType: 'GOOGLE' | 'FACEBOOK' | 'GITHUB'
  ): Observable<User> {
    return new Observable<User>((observable) => {
      this.auth
        .signInWithPopup(
          popupType === 'FACEBOOK'
            ? new firebase.auth.FacebookAuthProvider()
            : popupType === 'GOOGLE'
            ? new firebase.auth.GoogleAuthProvider()
            : new firebase.auth.GithubAuthProvider()
        )
        .then((userCredential: firebase.auth.UserCredential) => {
          if (userCredential.user) {
            const user: User = {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              display_name: userCredential.user.displayName
                ? userCredential.user.displayName
                : '',
              avatar_url: userCredential.user.photoURL,
            };
            if (userCredential.additionalUserInfo?.isNewUser) {
              this.userFirestore.addNewUser(user).then(() => {
                observable.next(user);
                observable.complete();
              });
            } else {
              observable.next(user);
              observable.complete();
            }
          }
        })
        .catch((error: firebase.FirebaseError) => {
          observable.error(error);
        });
    });
  }

  logOut(): Observable<boolean> {
    return new Observable<boolean>((observable) => {
      this.auth
        .signOut()
        .then(() => {
          observable.next(true);
          observable.complete();
        })
        .catch((err) => observable.error(err));
    });
  }
}
