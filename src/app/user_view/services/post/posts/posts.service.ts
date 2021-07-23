import { Post } from './../../../models/post.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  getAllPosts(){
    return this.afs.collection<Post>('posts').valueChanges({
      idField: 'id'
    })
  }
  constructor(private afs: AngularFirestore) { }
}
