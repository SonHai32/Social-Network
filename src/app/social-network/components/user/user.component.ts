import { PostsService } from 'src/app/social-network/services/posts.service';
import { UserService } from 'src/app/social-network/services/user.service';
import { User } from 'src/app/social-network/models/user.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { vmFromLatest } from '../../utils/operators';
interface userStaticVM {
  totalPost: number;
  totalFriend: number;
  totalImage: number;
  userInfo: User
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostsService
  ) {}
  userID!: string | null;
  user!: Observable<User>;
  userStatic!: Observable<userStaticVM>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((val) => {
      const ID = val.get('id');
      if (ID) {
        this.userID = val.get('id');
        // this.user = this.userService.getUserInfo(ID);
        this.userStatic = vmFromLatest<userStaticVM>({
          totalFriend: this.userService.getTotalFriend(ID),
          totalImage: this.postService.getTotalImagePostByUser(ID),
          totalPost: this.postService.getTotalPost(ID),
          userInfo: this.userService.getUserInfo(ID)
        });
      }
    });
  }
}
