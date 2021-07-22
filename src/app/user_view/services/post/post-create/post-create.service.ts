import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzImage } from 'ng-zorro-antd/image';
import { combineLatest, Observable, of, observable } from 'rxjs';
import { Post } from './../../../models/post.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { combineAll, finalize, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostCreateService {
  fileUpload(imageFile: NzUploadFile[]): Observable<string[]> {
    return new Observable<string[]>((observable) => {
      const imageList: Observable<
        firebase.default.storage.UploadTaskSnapshot | undefined
      >[] = [];
      const imageRef: Observable<any>[] = [];
      imageFile.forEach((image: any) => {
        const path = `images/${image.uid}`;
        const fileRef = this.afs.ref(path);
        imageRef.push(fileRef.getDownloadURL());
        imageList.push(this.afs.upload(path, image).snapshotChanges());
      });

      combineLatest(imageList)
        .pipe(
          finalize(() => {
            combineLatest(imageRef).subscribe((listUrl: string[]) => {
              observable.next(listUrl);
              observable.complete();
            });
          }),
          catchError((err) => of(observable.error(err)))
        )
        .subscribe();
    });
  }

  postUpload(
    postOriginal: Post,
    postImageContent?: NzUploadFile[] | null
  ): Observable<boolean> {
    return new Observable<boolean>((observable) => {
      const upload = (post: Post) => {
        this.afdb
          .collection<Post>('posts')
          .add({ ...post, id: this.afdb.createId() })
          .then((resPost) => {
            if (resPost) {
              observable.next(true);
              observable.complete();
            } else {
              observable.next(false);
              observable.complete();
            }
          })
          .catch((err) => observable.error(err));
      };

      if (postImageContent) {
        this.fileUpload(postImageContent).subscribe((val: string[]) => {
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
    private afs: AngularFireStorage,
    private afdb: AngularFirestore
  ) {}
}
