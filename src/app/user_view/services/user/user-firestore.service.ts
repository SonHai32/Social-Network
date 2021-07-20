import { User } from './../../models/user.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService {

  constructor(private afs: AngularFirestore) { }

  // getUserInfo(userID: string): Observable<User>{
  //   this.afs.doc('users').get()
  // }

  addNewUser(user: User): Promise<DocumentReference<User>>{
    return this.afs.collection<User>('users').add(user)
  }
}
