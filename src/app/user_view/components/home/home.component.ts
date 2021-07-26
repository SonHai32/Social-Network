import { getUserSelector } from './../../store/auth/auth.selectors';
import { User } from './../../models/user.model';
import { AppState } from './../../store/app.state';
import { GetAllPost } from './../../store/posts/posts.actions';
import { getPostLoading } from './../../store/posts/posts.selectors';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from './../../models/post.model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { vmFromLatest } from '../../utils/operators';
import { getPostsSelector } from '../../store/posts/posts.selectors';
interface PostListVm{
  posts: Post[],
  isLoading: boolean,
  currentUser?: User | null,
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class HomeComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe()
  }
  subscription!: Subscription;

  vm$!: Observable<PostListVm>
  ngOnInit(): void {
    this.subscription = new Subscription()
    this.subscription.add(this.store.dispatch(GetAllPost()))
    this.vm$ = vmFromLatest<PostListVm>({
      posts: this.store.pipe(select(getPostsSelector)),
      isLoading: this.store.pipe(select(getPostLoading)),
      currentUser: this.store.pipe(select(getUserSelector))
    })
    this.subscription.add(this.vm$.subscribe())

  }





  // getAllPost(){
  //   this.postsService.getAllPosts().subscribe((posts: Post[]) =>{
  //     this.posts = posts
  //   })
  // }
}
