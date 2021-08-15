import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/app';
import * as moment from 'moment'


@Pipe({
  name: 'toHours'
})
export class ToHoursPipe implements PipeTransform {

  transform(
    value: Date | moment.Moment | undefined | firebase.firestore.Timestamp
  ): string {
    if (value) {
      return moment(value).format('LT');
    }
    return '';
  }

}
