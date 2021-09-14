import { Observable } from 'rxjs';

export function getBase64(file: File): Observable<string | ArrayBuffer | null> {
  return new Observable((observable) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      observable.next(reader.result);
      observable.complete();
    };
    reader.onerror = (error) => observable.error(error);
  });
}
