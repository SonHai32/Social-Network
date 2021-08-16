import { User } from 'src/app/user_view/models/user.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userDisplayNameFilter',
})
export class UserDisplayNameFilterPipe implements PipeTransform {
  transform(users: User[], filter: string): User[] {
    return users.filter(
      (user) =>
        user.display_name.toLocaleLowerCase().indexOf(filter.toLowerCase()) > -1
    );
  }
}
