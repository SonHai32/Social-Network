import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService {

  constructor(private afs: AngularFirestore) { }

  addNewUser(user: User): Promise<DocumentReference<User>>{
    return this.afs.collection<User>('users').add(user)
  }
}
