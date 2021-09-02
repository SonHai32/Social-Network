import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../services/user.service';
import { vmFromLatest } from '../../utils/operators';
interface SearchVM {
  users: User[];
  posts: Post[];
}
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  searchVM$!: Observable<SearchVM>;
  constructor(
    private userService: UserService,
    private postService: PostsService
  ) {}

  ngOnInit(): void {}
  handleSearchChange(value: string) {
    this.searchVM$ = vmFromLatest<SearchVM>({
      users: this.userService.searchUser(value),
      posts: this.postService.searchPost(value),
    });
  }
}
