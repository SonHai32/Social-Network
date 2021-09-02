import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/app';
import * as moment from 'moment';
moment.locale('vi');
@Pipe({
  name: 'fromNow',
})
export class FromNowPipe implements PipeTransform {
  transform(
    value: Date | moment.Moment | undefined | firebase.firestore.Timestamp
  ): string {
    if (value) {
      return moment(value).fromNow();
    }
    return '';
  }
}
