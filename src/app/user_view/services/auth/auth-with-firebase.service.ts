import { User } from './../../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserCredentials } from '../../models/user-credentials.model';

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
  async createUserWithEmailAndPassword(userCredentials: UserCredentials): Promise<any | null> {
    const res = await this.auth.createUserWithEmailAndPassword(
      userCredentials.email,
      userCredentials.password
    );
    if (res.user) {
      const resUser: User = {id: res.user.uid, email: userCredentials.email, fullName: userCredentials.fullname}
      const saveUser = await  (await (await (await this.afs.collection<User>('users').add(resUser)).get()).data())

      if(saveUser){
        console.log(saveUser)
        return saveUser
      }

    } else {
      return null;
    }
  }



}
