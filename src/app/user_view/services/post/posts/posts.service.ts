import { observable, Observable } from 'rxjs';
import { Post } from './../../../models/post.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  getAllPosts() {
    return this.afs
      .collection<Post>('posts', (ref) => ref.orderBy('created_at', 'desc'))
      .snapshotChanges(['added', 'removed']);
  }

  postUpdateLike(postID: string, userID: string): Observable<boolean> {
    return new Observable<boolean>((observable) => {
      const path: string = `posts/${postID}`;
      this.afs
        .doc<Post>(path)
        .get()
        .subscribe((resPost) => {
          try {
            if (resPost.exists) {
              const post: Post = resPost.data() as Post;
              const userLiked: string[] = post.liked_by_user_id
                ? post.liked_by_user_id
                : [];
              if (userLiked.includes(userID)) {
                this.afs
                  .doc<Post>(path)
                  .update({
                    liked_by_user_id: userLiked.filter(
                      (id: string) => id !== userID
                    ),
                  })
                  .then(() => {
                    observable.next(true);
                    observable.complete();
                  });
              } else {
                this.afs
                  .doc<Post>(path)
                  .update({ liked_by_user_id: [...userLiked, userID] })
                  .then(() => {
                    observable.next(true);
                    observable.complete();
                  });
              }
            } else {
              observable.error(new Error('Bài viết không còn tồn tại'));
            }
          } catch (error) {
            observable.error(error);
          }
        });
    });
  }


  isUserLiked(postID: string, userID: string): Observable<boolean> {
    return new Observable<boolean>((observable) => {
      this.afs.doc<Post>(`posts/${postID}`).get().subscribe((res) =>{
        res.ref.onSnapshot((snapshot) =>{
          if(snapshot.data()?.liked_by_user_id){

        console.log('like');
            observable.next(snapshot.data()?.liked_by_user_id?.includes(userID));
          }else{
            observable.error(new Error('Bài viết không còn tồn tại'))
          }
        })
      });
    });
  }

  constructor(private afs: AngularFirestore) {}
}
