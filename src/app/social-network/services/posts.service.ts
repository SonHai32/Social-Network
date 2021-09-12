import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { map } from 'rxjs/operators';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { status } from '../models/status.model';
import { NzImage } from 'ng-zorro-antd/image';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  getTotalPost(): Observable<number> {
    return this.afs
      .collection<Post>('posts')
      .snapshotChanges(['added', 'removed'])
      .pipe(map((resPost) => resPost.length));
  }

  searchPost(key: string) {
    return this.afs
      .collection<Post>('posts')
      .valueChanges()
      .pipe(
        map((res) =>
          res.filter((value) => {
            if (value.post_content.text_content && value.post_content.hashtag) {
              return (
                value.post_content.text_content?.indexOf(key) >= 0 ||
                value.post_content.hashtag.includes(key)
              );
            } else if (value.post_content.hashtag) {
              return value.post_content.hashtag.includes(key);
            } else if (value.post_content.text_content) {
              return value.post_content.text_content?.indexOf(key) >= 0;
            } else {
              return false;
            }
          })
        )
      );
  }

  getAllPosts(limit: number, userID?: string) {
    if (userID) {
      return this.afs
        .collection<Post>('posts', (ref) =>
          ref
            .orderBy('created_at', 'desc')
            .where('created_by_id', '==', userID)
            .limit(limit)
        )
        .snapshotChanges(['added', 'removed']);
    }
    return this.afs
      .collection<Post>('posts', (ref) =>
        ref.orderBy('created_at', 'desc').limit(limit)
      )
      .snapshotChanges(['added', 'removed']);
  }

  getPostLike(postID: string): Observable<number> {
    return this.afs
      .doc<Post>(`posts/${postID}`)
      .snapshotChanges()
      .pipe(
        map((resPost) => {
          let count = resPost.payload.data()?.liked_by_user_id?.length;
          if (count) {
            return count;
          } else {
            return 0;
          }
        })
      );
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
      this.afs
        .doc<Post>(`posts/${postID}`)
        .get()
        .subscribe((res) => {
          if (res) {
            res.ref.onSnapshot((snapshot) => {
              if (snapshot.data()?.liked_by_user_id) {
                observable.next(
                  snapshot.data()?.liked_by_user_id?.includes(userID)
                );
              }
            });
          } else {
            observable.error(new Error('Bài viết không tồn tại'));
          }
        });
    });
  }
  postUpload(
    postOriginal: Post,
    postImageContent?: NzUploadFile[] | undefined
  ): Observable<status> {
    return new Observable<status>((observable) => {
      const upload = (post: Post) => {
        this.afs
          .collection<Post>('posts')
          .add(post)
          .then((resPost) => {
            if (resPost) {
              observable.next('success');
              observable.complete();
            } else {
              observable.next('error');
              observable.complete();
            }
          })
          .catch((err) => observable.error(err));
      };

      if (postImageContent) {
        this.storageService
          .fileUpload(postImageContent, postOriginal.created_by_id)
          .subscribe((val: string[]) => {
            const imageList: NzImage[] = [];
            val.forEach((url: string) => {
              imageList.push({ src: url });
            });

            upload({
              ...postOriginal,
              post_content: {
                ...postOriginal.post_content,
                image_content: imageList,
              },
            });
          });
      } else {
        upload(postOriginal);
      }
    });
  }

  constructor(
    private afs: AngularFirestore,
    private storageService: StorageService
  ) {}
}
