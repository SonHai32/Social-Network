import { NzUploadFile } from 'ng-zorro-antd/upload';
import { status } from './../models/status.model';
import { Observable, observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { PostComment } from '../models/comment.model';
import { Post } from '../models/post.model';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  getAllComment(postID: string) {
    return this.afs
      .collection<PostComment>('comments', (ref) =>
        ref.where('postID', '==', postID)
      )
      .snapshotChanges()
      .pipe(
        map((res) => {
          return res.map((val) => {
            return {
              ...(val.payload.doc.data() as PostComment),
              id: val.payload.doc.id,
            };
          });
        })
      );
  }

  getCommentCount(postID: string) {
    return this.afs
      .collection<PostComment>('comments', (ref) =>
        ref.where('postID', '==', postID)
      )
      .snapshotChanges()
      .pipe(
        map((res) => {
          let sum = res.length;
          res.forEach((comment) => {
            let childComment =
              comment.payload.doc.data().child_comments?.length;
            if (childComment) {
              sum += childComment;
            }
          });
          return sum;
        })
      );
  }

  postComment(
    isChild: boolean,
    comment: PostComment,
    commentID?: string,
    commentImage?: NzUploadFile
  ): Observable<status> {
    return new Observable<status>((observable) => {
      if (!isChild) {
        this.afs
          .collection<PostComment>('comments')
          .add(comment)
          .then((resComment) => {
            this.afs
              .doc<Post>(`posts/${comment.postID}`)
              .update({ commentID: resComment.id })
              .then(() => {
                observable.next('success');
                observable.complete();
              });
          })
          .catch((err) => observable.error(err));
      } else {
        this.afs
          .doc<PostComment>(`comments/${commentID}`)
          .get()
          .subscribe((res) => {
            const child_comments = (res.data() as PostComment).child_comments;
            child_comments?.push(comment);
            this.afs
              .doc(`comments/${commentID}`)
              .update({ child_comments })
              .then(() => {
                observable.next('success');
                observable.complete();
              });
          });
      }
    });
  }

  constructor(private afs: AngularFirestore) {}
}
