import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
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
  constructor(private afs: AngularFireStorage) {}
}
