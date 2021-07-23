import { PostsState } from './../../store/posts/posts.state';
import { AppState } from './../../store/app.state';
import { GetAllPost } from './../../store/posts/posts.actions';
import { getPostLoading } from './../../store/posts/posts.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from './../../models/post.model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { vmFromLatest } from '../../utils/operators';
import { getPostsSelector } from '../../store/posts/posts.selectors';
interface PostListVm{
  posts: Post[],
  isLoading: boolean,
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class HomeComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  vm$!: Observable<PostListVm>
  ngOnInit(): void {
    this.store.dispatch(GetAllPost())
    this.vm$ = vmFromLatest<PostListVm>({
      posts: this.store.pipe(select(getPostsSelector)),
      isLoading: this.store.pipe(select(getPostLoading))
    })

  }



  // getAllPost(){
  //   this.postsService.getAllPosts().subscribe((posts: Post[]) =>{
  //     this.posts = posts
  //   })
  // }
}
